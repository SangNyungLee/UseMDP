import { Outlet } from 'react-router-dom';
import NewButton from './button';
import Header from './views/Header';
import Example from './modal/ModalExample';
import CardEditor from './post/Editor/CardEditor';

function App() {
  return (
    <>
      <Header/>
      {/* <NewButton></NewButton>
      <Example />
      <CardEditor /> */}
      <Outlet/>
    </>
  );

}

export default App;
