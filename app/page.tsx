import Game from './components/Game';
export default function Home() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <h1>Pushing Boxes Game</h1>
      <Game />
    </div>
  );
}
