import { useState } from "react";
import {Bell,Moon,User,Shield,Play,ChevronRight,} from "lucide-react";



const Settings = () => {
    
//   const [notifications, setNotifications] = useState(true);
//   const [autoplay, setAutoplay] = useState(true);
const [darkMode, setDarkMode] = useState(() => {
  const saved = localStorage.getItem("darkMode");

  return saved
    ? JSON.parse(saved)
    : true;
});
const toggleDarkMode = () => {
  const newValue = !darkMode;

  setDarkMode(newValue);

  localStorage.setItem(
    "darkMode",
    JSON.stringify(newValue)
  );
};
  return (
    <main className="settings-page">
      <div className="settings-container">

        {/* Header */}
        <div className="settings-header">
          <h1>Settings</h1>
          <p>
            Manage your account and movie preferences.
          </p>
        </div>

        {/* Account */}
        <section className="settings-section">
          <h2>Account</h2>

          <div className="settings-card">

            <button className="settings-item">
              <div className="settings-item-left">
                <div className="settings-icon">
                  <User size={20} />
                </div>

                <div>
                  <h3>Profile</h3>
                  <p>
                    Manage your profile information
                  </p>
                </div>
              </div>

              <ChevronRight size={20} />
            </button>

            <button className="settings-item">
              <div className="settings-item-left">
                <div className="settings-icon">
                  <Shield size={20} />
                </div>

                <div>
                  <h3>Privacy & Security</h3>
                  <p>
                    Manage your privacy and security
                  </p>
                </div>
              </div>

              <ChevronRight size={20} />
            </button>

          </div>
        </section>

        {/* Preferences */}
        <section className="settings-section">
          <h2>Preferences</h2>

          <div className="settings-card">

            {/* Notifications
            <div className="settings-item">
              <div className="settings-item-left">
                <div className="settings-icon">
                  <Bell size={20} />
                </div>

                <div>
                  <h3>Notifications</h3>
                  <p>
                    Receive updates about movies and shows
                  </p>
                </div>
              </div>

              <label className="switch">
                <input
                  type="checkbox"
                  checked={notifications}
                  onChange={() =>
                    setNotifications(!notifications)
                  }
                />

                <span className="slider"></span>
              </label>
            </div>

          
            <div className="settings-item">
              <div className="settings-item-left">
                <div className="settings-icon">
                  <Play size={20} />
                </div>

                <div>
                  <h3>Autoplay</h3>
                  <p>
                    Automatically play movie previews
                  </p>
                </div>
              </div>

              <label className="switch">
                <input
                  type="checkbox"
                  checked={autoplay}
                  onChange={() =>
                    setAutoplay(!autoplay)
                  }
                />

                <span className="slider"></span>
              </label>
            </div>

            
            <div className="settings-item">
              <div className="settings-item-left">
                <div className="settings-icon">
                  <Moon size={20} />
                </div>

                <div>
                  <h3>Dark Mode</h3>
                  <p>
                    Use dark appearance throughout the app
                  </p>
                </div>
              </div>

              <label className="switch">
                <input
                  type="checkbox"
                  checked={darkMode}
                  onChange={toggleDarkMode}
                    
                  
                />

                <span className="slider"></span>
              </label>
            </div>*/}

          </div>
        </section> 

        {/* About */}
        <section className="settings-section">
          <h2>About</h2>

          <div className="settings-card">

            <button className="settings-item">
              <div>
                <h3>About Elite Movie</h3>
                <p>
                  Learn more about the application
                </p>
              </div>

              <ChevronRight size={20} />
            </button>

            <button className="settings-item">
              <div>
                <h3>Terms & Conditions</h3>
                <p>
                  Read our terms and conditions
                </p>
              </div>

              <ChevronRight size={20} />
            </button>

            <button className="settings-item">
              <div>
                <h3>Privacy Policy</h3>
                <p>
                  Read our privacy policy
                </p>
              </div>

              <ChevronRight size={20} />
            </button>

          </div>
        </section>

        {/* <p className="settings-version">
          Elite Movie v1.0.0
        </p> */}

      </div>
    </main>
  );
};

export default Settings;