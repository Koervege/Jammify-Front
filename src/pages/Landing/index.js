import { Piano, KeyboardShortcuts, MidiNumbers } from 'react-piano';
import 'react-piano/dist/styles.css';
import DimensionsProvider from '../../components/DimensionsProvider';
import SoundfontProvider from '../../components/SoundFontProvider';

function Landing(props) {

  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const soundfontHostname = 'https://d1pzp51pvbm36p.cloudfront.net';

  const noteRange = {
    first: MidiNumbers.fromNote('c3'),
    last: MidiNumbers.fromNote('f5'),
  };

  const keyboardShortcuts = KeyboardShortcuts.create({
    firstNote: noteRange.first,
    lastNote: noteRange.last,
    keyboardConfig: KeyboardShortcuts.HOME_ROW,
  });
 
  return (
    <DimensionsProvider>
      {({ containerWidth, containerHeight }) => (
        <SoundfontProvider
          instrumentName="acoustic_grand_piano"
          audioContext={audioContext}
          hostname={soundfontHostname}
          render={({ isLoading, playNote, stopNote }) => (
            <Piano
              noteRange={noteRange}
              width={containerWidth}
              playNote={playNote}
              stopNote={stopNote}
              disabled={isLoading}
              keyboardShortcuts={keyboardShortcuts}
              {...props}
            />
          )}
        />
      )}
    </DimensionsProvider>
  );
};

export default Landing;
