import './App.css'
import { Outlet } from 'react-router-dom'
import Navbar from './Layout/Shared/Navbar'
import Footer from './Layout/Shared/Footer'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <header className="fixed top-0 left-0 w-full z-10 shadow-md">
          <Navbar></Navbar>
        </header>

        <main className="flex-grow mt-20">
          <div className="container max-w-7xl mx-auto p-2">
            <Outlet></Outlet>
          </div>
          <ToastContainer />
        </main>

        <footer className="mt-auto w-full bg-customPurple2">
          <Footer></Footer>
        </footer>
      </div>
    </>
  )
}

export default App
