import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';
import {
  Route,
  Routes,
  Navigate,
  NavLink,
  useParams,
  Outlet,
  Link,
} from 'react-router-dom';
import classNames from 'classnames';

const tabs = [
  { id: 'tab-1', title: 'Tab 1', content: 'Some text 1' },
  { id: 'tab-2', title: 'Tab 2', content: 'Some text 2' },
  { id: 'tab-3', title: 'Tab 3', content: 'Some text 3' },
];

function TabsPage() {
  const { tabId } = useParams();

  return (
    <>
      {' '}
      <h1 className="title">Tabs page</h1>
      <div className="tabs is-boxed">
        <ul>
          {tabs.map(tab => (
            <li
              key={tab.id}
              data-cy="Tab"
              className={tabId === tab.id ? 'is-active' : ''}
            >
              <Link to={`/tabs/${tab.id}`}>{tab.title}</Link>
            </li>
          ))}
        </ul>
      </div>
      {!tabId ? (
        <div className="block" data-cy="TabContent">
          <p>Please select a tab</p>
        </div>
      ) : (
        <Outlet />
      )}
    </>
  );
}

function TabContent() {
  const { tabId } = useParams();
  const tab = tabs.find(t => t.id === tabId);

  if (!tab) {
    return (
      <div className="block" data-cy="TabContent">
        <p>Please select a tab</p>
      </div>
    );
  }

  return (
    <div className="block" data-cy="TabContent">
      <p>{tab.content}</p>
    </div>
  );
}

export const App = () => (
  <>
    {/* Also requires <html class="has-navbar-fixed-top"> */}
    <nav
      className="navbar is-light is-fixed-top is-mobile has-shadow"
      data-cy="Nav"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink
            to="/"
            className={({ isActive }) =>
              classNames('navbar-item', { 'is-active': isActive })
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/tabs"
            className={({ isActive }) =>
              classNames('navbar-item', { 'is-active': isActive })
            }
          >
            Tabs
          </NavLink>
        </div>
      </div>
    </nav>

    <div className="section">
      <div className="container">
        <Routes>
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/" element={<h1 className="title">Home page</h1>} />
          <Route path="/tabs" element={<TabsPage />}>
            <Route path=":tabId" element={<TabContent />} />
          </Route>
          <Route path="*" element={<h1 className="title">Page not found</h1>} />
        </Routes>
      </div>
    </div>
  </>
);
