import React, { lazy, Suspense, useState, useEffect } from 'react'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'

// STYLE
import 'antd/dist/antd.css'
import './styles/theme.scss'

// COMPONENTS
import Loader from './components/loader/Loader'


import HttpClient from './helpers/network/HttpClient'

// CONTEXT 
import AuthContext from './context/AuthContext';

// COOKIE
import Cookies from "universal-cookie";
const cookies = new Cookies();


// PAGES
const LoginPage = lazy(() => import('./pages/login/login.page'))
const HomePage = lazy(() => import('./pages/home/home.page'))
const ActorPage = lazy(() => import('./pages/actor/actor.page'))
const CategoryPage = lazy(() => import('./pages/category/category.page'))
const CategoryQuestionPage = lazy(() => import('./pages/categoryquestion/category.question.page'))
const InternationalizationPage = lazy(() => import('./pages/internationalization/internationalization.page'))
const NotaryPage = lazy(() => import('./pages/notary/notary.page'))
const NotaryPageCRUD = lazy(() => import('./pages/notary/components/Notary.page'))
const SubcategoryQuestionPage = lazy(() => import('./pages/subcategoryquestion/subcategoryquestion.page'))
const UserPage = lazy(() => import('./pages/user/user.page'))
const QuestionPage = lazy(() => import('./pages/question/question.page'))
const PolicyPage = lazy(() => import('./pages/policies/policy.page'))
const ContactPage = lazy(() => import('./pages/contact/contact.page'))
const NotarialActPage = lazy(() => import('./pages/notarialact/notarial.act.page'))
const NotarialAct = lazy(() => import('./pages/notarialact/components/NotarialAct'))
const BannerPage = lazy(() => import('./pages/banner/banner.page'))
const CommentPage = lazy(() => import('./pages/comment/comment.page'))
const PolicyPageCRUD = lazy(() => import('./pages/policies/components/PolicyPage'))
const InputPage = lazy(() => import('./pages/input/input.page'))
const CallmePage = lazy(() => import('./pages/callme/callme.page'))
const ChatPage = lazy(() => import('./pages/chat/chat.page'))
const ChatbotPage = lazy(() => import('./pages/chatbot/chatbot.page'))
const Chatbot= lazy(() => import('./pages/chatbot/components/Chatbot'))
const Aditional= lazy(() => import('./pages/aditionalconfig/aditional.page'))
const Notification= lazy(() => import('./pages/notification/notification.page'))

function App() {

  const [user, setUser] = useState();

  const loadUser = async () => {
    const response = await HttpClient.get('/api/user/reload');
    if (response.status == 200) {
      setUser(response.data);
    } else {
      if (cookies.get('token')) {
        cookies.remove('token');
        window.location.href = "/login";
      }
    }
  }

  // RUTAS PRIVADAS
  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
      cookies.get('token')
        ? <Component {...props} />
        : <Redirect to='/login' />
    )} />
  )

  useEffect(() => {
    loadUser();
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user: user,
        updateUser: setUser
      }}>
      <Suspense fallback={<Loader />}>
        <BrowserRouter>
          <Switch>
            <Route path='/login' component={LoginPage} />
            {/* PANEL DE CONTROL */}
            <PrivateRoute exact path="/" component={HomePage} />

            {/* TRAMITES */}
            <PrivateRoute exact path="/notary" component={NotaryPage} />
            <PrivateRoute exact path="/notarycrud" component={NotaryPageCRUD} />
            <PrivateRoute exact path="/notarial-act/view" component={NotarialActPage} />
            <PrivateRoute exact path="/notarial-act/form" component={NotarialAct} />
            <PrivateRoute exact path="/notarial-act/category" component={CategoryPage} />
            <PrivateRoute exact path="/notarial-act/actor" component={ActorPage} />
            <PrivateRoute exact path="/notarial-act/input" component={InputPage} />

            {/* CONFIGURACIÓN */}
            <PrivateRoute exact path="/website/banner" component={BannerPage} />
            <PrivateRoute exact path="/website/comment" component={CommentPage} />
            <PrivateRoute exact path="/website/pages" component={PolicyPageCRUD} />
            <PrivateRoute exact path="/website/categoryquestion" component={CategoryQuestionPage} />
            <PrivateRoute exact path="/website/internationalization" component={InternationalizationPage} />
            <PrivateRoute exact path="/website/subcategoryquestion" component={SubcategoryQuestionPage} />
            <PrivateRoute exact path="/website/question" component={QuestionPage} />
            <PrivateRoute exact path="/website/page" component={PolicyPage} />
            <PrivateRoute exact path="/website/contact" component={ContactPage} />
            <PrivateRoute exact path="/user" component={UserPage} />
            <PrivateRoute exact path="/chatbot" component={ChatbotPage} />
            <PrivateRoute exact path="/chatbot/form" component={Chatbot} />
            <PrivateRoute exact path="/aditional-config" component={Aditional} />
            <PrivateRoute exact path="/notification" component={Notification} />

            {/* SOPORTE */}
            <PrivateRoute exact path="/support/callme" component={CallmePage} />
            <PrivateRoute exact path="/support/chat" component={ChatPage} />
            
            
          </Switch>
        </BrowserRouter>
      </Suspense>
    </AuthContext.Provider>
  );
}

export default App;
