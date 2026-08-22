/**
 * Mic float frames -> fixed-size batches for the Sarvam realtime socket.
 *
 * The graph runs at 16 kHz (the AudioContext is constructed at that rate, so
 * the browser resamples for us and no manual downsampling is needed). Each
 * process() call carries 128 samples = 8 ms, which is too chatty for a
 * WebSocket, so frames are batched to `frame` samples before being posted.
 */
class PCMProcessor extends AudioWorkletProcessor {
  constructor(options) {
    super();
    this.frame = options?.processorOptions?.frame ?? 320; // 20 ms at 16 kHz
    this.buf = new Float32Array(this.frame);
    this.n = 0;
  }

  process(inputs) {
    const ch = inputs[0]?.[0];
    if (!ch) return true;

    for (let i = 0; i < ch.length; i++) {
      this.buf[this.n++] = ch[i];
      if (this.n === this.frame) {
        // Convert here, on the audio thread, so the main thread only handles
        // an already-packed buffer.
        const pcm = new Int16Array(this.frame);
        for (let j = 0; j < this.frame; j++) {
          const s = Math.max(-1, Math.min(1, this.buf[j]));
          pcm[j] = s < 0 ? s * 0x8000 : s * 0x7fff;
        }
        this.port.postMessage(pcm.buffer, [pcm.buffer]);
        this.n = 0;
      }
    }
    return true;
  }
}

registerProcessor('pcm', PCMProcessor);
