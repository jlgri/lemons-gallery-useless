(function(Scratch) {
  'use strict';
  
  if(!Scratch.extensions.unsandboxed) throw new Error('Please load the waveforms extension unsandboxed!')
  
  class WaveformsEXT {
    getInfo() {
      return {
        id: 'lemonWaveforms',
        name: 'Waveforms',
        blocks: [
          {
            opcode: 'sine',
            blockType: Scratch.BlockType.REPORTER,
            text: 'sine wave | [F0]hz',
            arguments: {
              F0: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1
              }
            }
          },
          {
            opcode: 'cosine',
            blockType: Scratch.BlockType.REPORTER,
            text: 'cosine wave | [F0]hz',
            arguments: {
              F0: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1
              }
            }
          },
          {
            opcode: 'semisine',
            blockType: Scratch.BlockType.REPORTER,
            text: 'semisine wave | [F0]hz',
            arguments: {
              F0: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1
              }
            }
          },
          
          '---',
          
          {
            opcode: 'square',
            blockType: Scratch.BlockType.REPORTER,
            text: 'square wave | [F0]hz | harmonics: [HARMONICS]',
            arguments: {
              F0: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1
              },
              HARMONICS: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 50
              }
            }
          },
          {
            opcode: 'triangle',
            blockType: Scratch.BlockType.REPORTER,
            text: 'triangle wave | [F0]hz | harmonics: [HARMONICS]',
            arguments: {
              F0: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1
              },
              HARMONICS: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 10
              }
            }
          },
          {
            opcode: 'sawtooth',
            blockType: Scratch.BlockType.REPORTER,
            text: 'sawtooth wave | [F0]hz | harmonics: [HARMONICS]',
            arguments: {
              F0: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1
              },
              HARMONICS: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 10
              }
            }
          },
          {
            opcode: 'pulse',
            blockType: Scratch.BlockType.REPORTER,
            text: 'pulse wave | [F0]hz | harmonics: [HARMONICS] | duty cycle: [DUTY_CYCLE]%',
            arguments: {
              F0: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1
              },
              HARMONICS: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 10
              },
              DUTY_CYCLE: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 25
              }
            }
          },
          
          '---',
          
          {
            opcode: 'semicircle',
            blockType: Scratch.BlockType.REPORTER,
            text: 'semicircle wave | [F0]hz | radius: [RADIUS]',
            arguments: {
              F0: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1
              },
              RADIUS: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1
              }
            }
          },
          {
            blockType: Scratch.BlockType.LABEL,
            text: 'Custom Waveforms'
          },
          {
            opcode: 'sinecosine',
            blockType: Scratch.BlockType.REPORTER,
            text: 'sinecosine wave | [F0]hz',
            arguments: {
              F0: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1
              }
            }
          },
          {
            opcode: 'cosinesine',
            blockType: Scratch.BlockType.REPORTER,
            text: 'cosinesine wave | [F0]hz',
            arguments: {
              F0: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1
              }
            }
          },
          {
            opcode: 'eulercosine',
            blockType: Scratch.BlockType.REPORTER,
            text: 'eulercosine wave | [F0]hz',
            arguments: {
              F0: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1
              }
            }
          }
        ]
      };
    }
  
    timer() {
      return Scratch.vm.runtime.ioDevices.clock.projectTimer();
    }
    
    sine({F0}) {
      return Math.sin(2 * Math.PI * Scratch.Cast.toNumber(F0) * this.timer());
    }
    
    cosine({F0}) {
      return Math.cos(2 * Math.PI * Scratch.Cast.toNumber(F0) * this.timer());
    }
    
    semisine({F0}) {
      return Math.abs(Math.sin(2 * Math.PI * Scratch.Cast.toNumber(F0) * this.timer()))
    }
    
    square({F0, HARMONICS}) {
      let value = 0;
      
      for(let k = 1; k <= Scratch.Cast.toNumber(HARMONICS) * 2; k += 2) {
        value += Math.sin(2 * Math.PI * k * Scratch.Cast.toNumber(F0) * this.timer()) / k;
      }
      
      return (4 / Math.PI) * value;
    }
    
    triangle({F0, HARMONICS}) {
      let value = 0;
      
      for(let k = 1; k <= Scratch.Cast.toNumber(HARMONICS) * 2; k += 2) {
        value += Math.pow(-1, (k - 1) / 2) * Math.sin(2 * Math.PI * k * Scratch.Cast.toNumber(F0) * this.timer()) / (k * k)
      }
      return (8 / Math.PI**2) * value;
    }
    
    sawtooth({F0, HARMONICS}) {
      let value = 0;
      
      for(let k = 1; k <= Scratch.Cast.toNumber(HARMONICS) * 2; k++) {
        value += Math.pow(-1, k + 1) * Math.sin(2 * Math.PI * k * Scratch.Cast.toNumber(F0) * this.timer()) / k;
      }
      
      return (2 / Math.PI) * value;
    }
    
    pulse({F0, HARMONICS, DUTY_CYCLE}) {
      let value = 0;
      
      for(let k = 1; k <= Scratch.Cast.toNumber(HARMONICS); k++) {
        value += Math.sin(2 * Math.PI * k * Scratch.Cast.toNumber(F0) * this.timer()) * Math.sin(Math.PI * k * (Scratch.Cast.toNumber(DUTY_CYCLE) / 100)) / k
      }
      
      return (2 / Math.PI) * value;
    }
    
    semicircle({F0, RADIUS}) {
      const T = 1 / Scratch.Cast.toNumber(F0);
      const phase = this.timer() % T;
      
      let x = 2 * Scratch.Cast.toNumber(RADIUS) * ((phase % (T / 2)) / (T / 2)) - Scratch.Cast.toNumber(RADIUS);
      
      const y = Math.sqrt(Scratch.Cast.toNumber(RADIUS) ** 2 - x ** 2)
      
      return phase < T / 2 ? y : -y
    }
    
    sinecosine({F0}) {
      return Math.sin(Math.cos(Scratch.Cast.toNumber(F0) * this.timer()) * Math.PI * 2);
    }
    
    cosinesine({F0}) {
      return Math.cos(Math.sin(Scratch.Cast.toNumber(F0) * this.timer()) * Math.PI * 2);
    }
    
    eulercosine({F0}) {
      return Math.cos(Scratch.Cast.toNumber(F0) * this.timer() * Math.sin(Math.E));
    }
  }

Scratch.extensions.register(new WaveformsEXT());})(Scratch)