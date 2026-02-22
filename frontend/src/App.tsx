

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Home from './components/Home'
import Assignments from './components/Assignments'
import Browse from './components/Browse'
import Profile from './components/Profile'
import AssignmentDescription from './components/AssignmentDescription'
import useGetAllAssignments from './components/hooks/useGetAllAssignments'
import Subjects from './components/admin/Subjects'
import SubjectCreate from './components/admin/SubjectCreate'
import SubjectSetup from './components/admin/SubjectSetup'
import AdminAssignments from './components/admin/AdminAssignments'
import PostAssignment from './components/admin/PostAssignment'
import ApplicantsList from './components/admin/ApplicantsList'
import ProtectedRoute from './components/admin/ProdectedRoute'
import Battles from './components/Battles'
import Heroes from './components/Heroes'

const appRouter = createBrowserRouter([
  {
  path:"/",
  element:<Home/>
},
 {
  path:"/login",
  element:<Login/>
},
 {
  path:"/signup",
  element:<Signup/>
}, 
{
  path:"/assignments",
  element:<Assignments/>
},
{
  path:"/description/:id",
  element:<AssignmentDescription/>
},
{
  path:"/browse",
  element:<Browse/>
},
{
  path:"/profile/:id?",
  element:<Profile/>
},
{
  path:"/battles",
  element:<Battles/>
}
,
{
  path:"/leaderboard",
  element:<Heroes/>
},

//paths for admin site
{
  path:"/admin/subjects",
  element:<ProtectedRoute><Subjects/></ProtectedRoute>
},
{
  
  path:"/admin/subjects/create",
  element:<ProtectedRoute><SubjectCreate/></ProtectedRoute>
},
{
  
  path:"/admin/subjects/:id",
  element:<ProtectedRoute><SubjectSetup/></ProtectedRoute>
},
{
path:"/admin/assignments",
element: <ProtectedRoute><AdminAssignments/></ProtectedRoute>
},{
path:"/admin/assignments/create",
element:<ProtectedRoute><PostAssignment/></ProtectedRoute>
},
{
path:"/admin/assignments/:id/applicants",
element:<ProtectedRoute><ApplicantsList/></ProtectedRoute>
},






])


function App() {

useGetAllAssignments()

  return (
    <>
      <RouterProvider router = {appRouter}/>
    </>
  )
}

export default App
