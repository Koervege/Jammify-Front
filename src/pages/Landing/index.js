import { Piano, KeyboardShortcuts, MidiNumbers } from 'react-piano';
import 'react-piano/dist/styles.css';
import DimensionsProvider from '../../components/DimensionsProvider';
import SoundfontProvider from '../../components/SoundFontProvider';
import { useState } from 'react';
import logo from '../../Jammify-logo.png';
import Navbar from '../../components/Navbar';
import { data } from '../../instruments'
import { signUp } from '../../components/AuthModal'
import Button from 'react-bootstrap/Button';
import './styles.css';

function Landing() {

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
  const [activeTheme, setActiveTheme] = useState(true)

  async function register() {
    try{
      const newUser = await signUp(logo)
      setActiveUser(newUser);
    } catch {
      return
    };
  };

  function Keyboard(props) {
    return (
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
    );
  };

  return (
    <main className="main">
      <Navbar></Navbar>
      <section className="container1">
        <img src={logo} alt='Jammify logo'></img>
        <h1 className="h1">Welcome to Jammify!</h1>
        <h2 className="h2">Start Jamming!</h2>
        <p className="ptext">Press the keys on your keyboard to press the corresponding key on the virtual piano.
          {activeUser ? ` Hi, ${activeUser.username}. You'll find all the preset sounds below the piano. Enjoy your stay! ` : ` Log in or Sign Up to unlock more sounds!`} </p>
        <div>
          <Button variant="outline-primary" onClick={() => register()}>Sign up</Button>
          <Button variant="outline-primary" onClick={() => register()}>Log in</Button>
        </div>
      </section>

      <section className="mt-5">
        <Button variant="dark" onClick={() => setActiveTheme(!activeTheme)}>Toggle Themes</Button>
        <Keyboard className={activeTheme.toString()}></Keyboard>
      </section>

      <section className="presetContainer">
        {activeUser ? (
          <Button variant="info" onClick={isMenuOpen ? e => toggleMenu(false) : e => toggleMenu(true) }>
          {isMenuOpen ? 'Hide presets' : 'Show presets'}
          </Button>) : (null)}
          
          {isMenuOpen ? (
            <div 
              className="presetMenu"
            >
              {presetList.map((presetName) => {
                return (
                  <Button variant="light" className='presetListElement' onClick={() => 
                    setActivePreset(presetName)} key={presetName}>
                      { presetName[0].toUpperCase() + 
                      presetName.slice(1).replaceAll('_', ' ') }
                  </Button>
                );
              })}
            </div>
            )
            : 
            (null)
         }
      </section>

    <div className="botBar"></div>
    </main>
  );
};

export default Landing;
