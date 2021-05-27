import { Piano, KeyboardShortcuts, MidiNumbers } from 'react-piano';
import 'react-piano/dist/styles.css';
import DimensionsProvider from '../../components/DimensionsProvider';
import SoundfontProvider from '../../components/SoundFontProvider';
import { useState } from 'react';
import logo from '../../Jammify-logo.png';
import Navbar from '../../components/Navbar';
import { data } from '../../instruments'
import { signUp } from '../../components/AuthModal'

function Landing(props) {

  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const soundfontHostname = 'https://d1pzp51pvbm36p.cloudfront.net';

  const firstNoteOctave = 3
  const noteRange = {
    first: MidiNumbers.fromNote(`c${firstNoteOctave}`),
    last: MidiNumbers.fromNote(`c${firstNoteOctave+4}`),
  };

  const keyboardShortcuts = KeyboardShortcuts.create({
    firstNote: noteRange.first,
    lastNote: noteRange.last,
    keyboardConfig: [
      ...KeyboardShortcuts.QWERTY_ROW, 
      ...KeyboardShortcuts.BOTTOM_ROW, 
      {
      natural: "'",
      flat: "'",
      sharp: "'"
    }],
  });

  const presetList = data.instruments;
  const [activePreset, setActivePreset] = useState(presetList[2]);
  const [isMenuOpen, toggleMenu] = useState(false);
  const [activeUser, setActiveUser] = useState(null)

  async function register() {
    try{
      const newUser = await signUp(logo)
      setActiveUser(newUser);
    } catch {
      return
    }

  }

  return (
    <main>
      <Navbar></Navbar>
      <img src={logo} alt='Jammify logo'></img>
      <h1>Welcome to Jammify!</h1>
      <h2>Start Jamming!</h2>
      <p>Press the keys on your keyboard to press the corresponding key on the virtual piano.
        {activeUser ? `Hi, ${activeUser.username}. You'll find all the preset sounds below the piano. Enjoy your stay!` : ` Log in or Sign Up to unlock more sounds!`} </p>
      <button onClick={() => register()}>Log in / Sign up</button>

      <section>
        <DimensionsProvider>
          {({ containerWidth }) => (
            <SoundfontProvider
              instrumentName={activePreset}
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
      </section>

      <section>
        {activeUser ? (
          <button onClick={isMenuOpen ? e => toggleMenu(false) : e => toggleMenu(true) }>
          {isMenuOpen ? 'Hide presets' : 'Show presets'}
          </button>) : (null)}
          
          {isMenuOpen ? (
            <div 
              className="presetMenu"
            >
              {presetList.map((presetName, index) => {
                return (
                  <button className='presetListElement' onClick={() => 
                    setActivePreset(presetName)} key={presetName}>
                      { presetName[0].toUpperCase() + 
                      presetName.slice(1).replaceAll('_', ' ') }
                  </button>
                );
              })}
            </div>
            )
            : 
            (null)
       
         }
        
    </section>
    </main>
  );
};

export default Landing;
