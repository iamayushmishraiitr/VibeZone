
import './App.css'
import Signin from './pages/Signin'
import { Routes , Route} from 'react-router'
import Front from './pages/Front'
import Pages from './pages/Pages'
import Post from "./pages/Post"
import Home from './pages/Home'
import Signup from './pages/Signup'
import Profile from './pages/Profile'
import EditProfile from './pages/EditProfile'
import Likes from './pages/Likes'
import Explore from './pages/Explore'
import { Toaster } from 'react-hot-toast'

export default function App() {
const Token= localStorage.getItem("token")
  return (
    <>
    <Toaster/>
    <Routes>
  {!Token && (
    <>
      <Route path="/" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route element={<Front />} />
    </>
  )}

  {Token && (
    <Route element={<Front />}>
      <Route path="/" element={<Home />} />
      <Route path="/post" element={<Post />} />
      <Route path="/pages" element={<Pages />} />
      <Route path="/EditProfile" element={<EditProfile />} />
      <Route path="/people/:id" element={<Profile />} />
      <Route path="/like" element={<Likes />} />
      <Route path="/explore" element={<Explore/>} />
    </Route>
  )}
</Routes>
</>

  )
}
