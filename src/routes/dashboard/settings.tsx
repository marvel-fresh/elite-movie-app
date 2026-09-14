import { useEffect, useState } from "react";
import { Bell, ChevronRight, Moon, Play, Shield, User, X } from "lucide-react";

type SettingsDetail = "profile" | "security" | "about" | "terms" | "privacy";

const detailContent: Record<SettingsDetail, { title: string; body: string }> = {
  profile: { title: "Profile", body: "Your profile details are managed through your Elite Movie account. Keep your display name and email up to date so your watchlist and viewing history stay connected." },
  security: { title: "Privacy & Security", body: "Your account preferences and watch activity are kept private. Review your sign-in details regularly and sign out of devices you no longer use." },
  about: { title: "About Elite Movie", body: "Elite Movie helps you discover films and TV shows, explore cast details, and keep track of what you want to watch." },
  terms: { title: "Terms & Conditions", body: "Use Elite Movie responsibly and respect the rights of the content providers and other people who use the service." },
  privacy: { title: "Privacy Policy", body: "Elite Movie uses your account preferences to personalize the experience. We do not sell your personal information." },
};

const Settings = () => {
  const [notifications, setNotifications] = useState(() => localStorage.getItem("elite-notifications") !== "false");
  const [autoplay, setAutoplay] = useState(() => localStorage.getItem("elite-autoplay") === "true");
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("elite-dark-mode") === "true");
  const [detail, setDetail] = useState<SettingsDetail | null>(null);

  useEffect(() => localStorage.setItem("elite-notifications", String(notifications)), [notifications]);
  useEffect(() => localStorage.setItem("elite-autoplay", String(autoplay)), [autoplay]);
  useEffect(() => localStorage.setItem("elite-dark-mode", String(darkMode)), [darkMode]);

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

            <button className="settings-item" type="button" onClick={() => setDetail("profile")}>
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

            <button className="settings-item" type="button" onClick={() => setDetail("security")}>
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
                  onChange={(event) => setNotifications(event.target.checked)}
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
                  onChange={(event) => setAutoplay(event.target.checked)}
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
                  onChange={(event) => setDarkMode(event.target.checked)}
                />

                <span className="slider"></span>
              </label>
            </div>

          </div>
        </section> 

        {/* About */}
        <section className="settings-section">
          <h2>About</h2>

          <div className="settings-card">

            <button className="settings-item" type="button" onClick={() => setDetail("about")}>
              <div>
                <h3>About Elite Movie</h3>
                <p>
                  Learn more about the application
                </p>
              </div>

              <ChevronRight size={20} />
            </button>

            <button className="settings-item" type="button" onClick={() => setDetail("terms")}>
              <div>
                <h3>Terms & Conditions</h3>
                <p>
                  Read our terms and conditions
                </p>
              </div>

              <ChevronRight size={20} />
            </button>

            <button className="settings-item" type="button" onClick={() => setDetail("privacy")}>
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

      {detail && (
        <div className="settings-modal-backdrop" role="presentation" onClick={() => setDetail(null)}>
          <section className="settings-modal" role="dialog" aria-modal="true" aria-labelledby="settings-modal-title" onClick={(event) => event.stopPropagation()}>
            <button className="settings-modal-close" type="button" aria-label="Close" onClick={() => setDetail(null)}>
              <X size={20} />
            </button>
            <h2 id="settings-modal-title">{detailContent[detail].title}</h2>
            <p>{detailContent[detail].body}</p>
          </section>
        </div>
      )}
    </main>
  );
};

export default Settings;