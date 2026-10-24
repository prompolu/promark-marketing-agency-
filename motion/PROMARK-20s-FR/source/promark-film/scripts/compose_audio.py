"""Original PROMARK score; procedural synthesis, no sampled or third-party music.
48kHz stereo, 120BPM. Edit notes, envelopes and event times below.
"""
from pathlib import Path
import numpy as np
from scipy import signal
from scipy.io import wavfile
P=Path(__file__).resolve().parents[1];SR=48000;N=20*SR
rng=np.random.default_rng(240120);music=np.zeros((N,2));fx=np.zeros_like(music)
def add(bus,s,t,gain=1,pan=0):
 start=round(t*SR); s=np.asarray(s)*gain
 if s.ndim==1:s=np.column_stack((s*np.sqrt((1-pan)/2),s*np.sqrt((1+pan)/2)))
 end=min(start+len(s),N)
 if end>start:bus[start:end]+=s[:end-start]
def tone(f,d,kind='pluck'):
 t=np.arange(round(SR*d))/SR
 if kind=='bass':
  env=(1-np.exp(-t*110))*np.exp(-t*5)*(np.minimum(1,(d-t)*40))
  return (np.sin(2*np.pi*f*t)+.22*np.sin(4*np.pi*f*t)+.08*np.sin(6*np.pi*f*t))*env
 if kind=='pad':
  env=(1-np.exp(-t*7))*np.minimum(1,(d-t)*3)
  return (np.sin(2*np.pi*f*t)+.15*np.sin(2*np.pi*(f*1.002)*t)+.08*np.sin(4*np.pi*f*t))*env
 env=(1-np.exp(-t*260))*np.exp(-t*6)*np.minimum(1,(d-t)*30)
 return (np.sin(2*np.pi*f*t)+.32*np.sin(4*np.pi*f*t)+.1*np.sin(6*np.pi*f*t))*env
midi=lambda x:440*2**((x-69)/12)
# E minor / Cmaj9 / A minor 9 / D suspended. Four two-second phrases repeat.
chords=[[52,55,59,62,66],[48,52,55,59,62],[45,52,55,59,64],[50,54,57,62,64]]
roots=[40,36,33,38]
for bar in range(9):
 onset=bar*2.;ch=chords[bar%4]
 for j,note in enumerate(ch):add(music,tone(midi(note+12),2.3,'pad'),onset,.028,(-.6+j*.3))
 for off in [0,.75,1.,1.5,1.75]:
  if onset+off<17.5:add(music,tone(midi(roots[bar%4]),.4,'bass'),onset+off,.29)
 for k,off in enumerate([.25,.75,1.25,1.625]):
  if onset+off>=17.5:continue
  wave=tone(midi(ch[(k+bar)%5]+24),.65)
  add(music,wave,onset+off,.1,(-.45 if k%2==0 else .45))
  add(music,wave,onset+off+.1875,.022,(.55 if k%2==0 else -.55))
# Restrained rhythm; warm kick, short snare, airy hats.
for beat in np.arange(0,17.51,.5):
 t=np.arange(int(.35*SR))/SR;phase=2*np.pi*(45*t+65*(1-np.exp(-t*32))/32)
 kick=np.sin(phase)*np.exp(-t*16)*(1-np.exp(-t*700))
 add(music,kick,beat,.43)
 if int(round(beat*2))%2:
  t=np.arange(int(.18*SR))/SR;noise=rng.normal(0,1,len(t));noise=signal.sosfilt(signal.butter(2,1800,fs=SR,btype='highpass',output='sos'),noise)
  snare=(noise*.5+np.sin(2*np.pi*180*t)*.18)*np.exp(-t*32)*(1-np.exp(-t*700));add(music,snare,beat,.12,.08)
for j,beat in enumerate(np.arange(.25,17.5,.25)):
 t=np.arange(int(.09*SR))/SR;noise=rng.normal(0,1,len(t));noise=signal.sosfilt(signal.butter(2,7500,fs=SR,btype='highpass',output='sos'),noise)
 add(music,noise*np.exp(-t*(70 if j%2==0 else 45)),beat,.032 if j%2==0 else .05,(-.35 if j%2==0 else .35))
def tick(t,pitch=1400,g=.05):
 x=np.arange(int(.055*SR))/SR;s=(np.sin(2*np.pi*pitch*x)+.2*rng.normal(size=len(x)))*np.exp(-x*100);add(fx,s,t,g,.15)
def sweep(t,d=.3,g=.10,low=False):
 x=np.arange(round(d*SR))/SR;n=rng.normal(size=len(x));n=signal.sosfilt(signal.butter(2,[240,6000],btype='bandpass',fs=SR,output='sos'),n)
 env=np.sin(np.pi*x/d)**1.7;s=n*env;add(fx,s,t,g,-.3);add(fx,s,t+.014,g*.8,.4)
 if low:
  x=np.arange(int(.45*SR))/SR;s=np.sin(2*np.pi*(43*x+35*(1-np.exp(-x*18))/18))*np.exp(-x*12);add(fx,s,t+d-.04,.21)
for i,t in enumerate([.15,.31,.46,.61,.76,1.0,1.12,1.24]):tick(t,1700+i*80,.025)
sweep(.95,.4,.035);sweep(2.18,.38,.13,True);sweep(3.45,.3,.09)
for t in [4.35,5.,5.7]:tick(t,850,.07)
for t in [6.55,6.65,6.75,6.85]:tick(t,1250,.043)
sweep(8.3,.35,.10,True);sweep(9.3,1.,.065);sweep(11.25,.28,.08,True)
for i,t in enumerate([13.7,14.07,14.44,14.81]):tick(t,1000+i*240,.05)
sweep(15.25,.35,.07);sweep(16.98,.48,.12,True)
# Deliberate E minor 9 resolution below the held brand frame.
for j,note in enumerate([40,52,55,59,64,66]):add(music,tone(midi(note),2.2,'pad'),17.8,.085 if j else .18,(-.5+j*.2))
add(music,tone(midi(76),1.8),17.8,.10,.2)
# Entire film ends smoothly, with no abrupt sample discontinuity.
fade=np.ones(N);fade[:960]=np.linspace(0,1,960);fade[-14400:]=np.linspace(1,0,14400)**1.5
music*=fade[:,None];fx*=fade[:,None]
for name,data in [('music',music),('sound-effects',fx),('mix-unmastered',music+fx)]:
 wavfile.write(P/'assets'/f'{name}.wav',SR,np.int16(np.clip(data,-1,1)*32767))
print('Written original score, effects and mix: 20.000s, 48kHz stereo.')
