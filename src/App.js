import React from "react";
import { Routes, Route } from "react-router-dom";
import AppsDevice from "./views/Devices/Applications/applications";
import Applications from "./views/Applications/applications.js";
import Configs from "./views/Preferences/Configs/configsPreferences";
import Dashboard from "./views/Devices/Dashboard/dashboard";
import DashboardGroup from "./views/Groups/Dashboard/dashboardGroups";
import Devices from "./views/Devices/devices";
import Gallery from "./views/Devices/Gallery/gallery";
import Groups from "./views/Groups/groups";
import Home from "./views/Home/home";
import Index from "./views/Index/index";
import Listas from "./views/Safeweb/listas";
import Locked from "./views/Preferences/Locked/lockedsPreferences";
import ManageApps from "./views/Applications/manage.js";
import SafeWeb from "./views/Safeweb/home";
import Server from "./views/Preferences/Server/serverPreferences";
import Ubications from "./views/Devices/Ubications/ubications";
import Users from "./views/Users/users";
import Layout from "./layout/Layout";
import Words from "./views/Safeweb/words";
import PreferencesSafeweb from "./views/Safeweb/preferences";
import Reports from "./views/Preferences/Reports/reportsPreferences";
import LogOut from "./components/generals/logout";
import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css";
import "./App.css";
import "./css/globals.css";

const App = () => {
    return (
        <div className="wrapper">
            <Routes>
                <Route exact path="/" element={<Index />} />
                <Route path="/mdm" element={<LogOut component={Layout} />}>
                    <Route
                        index
                        path="home"
                        element={<LogOut component={Home} />}
                    />
                    <Route
                        path="devices"
                        element={<LogOut component={Devices} />}
                    />
                    <Route
                        path="device/:id"
                        element={<LogOut component={Dashboard} />}
                    />
                    <Route
                        path="applications"
                        element={<LogOut component={Applications} />}
                    />
                    <Route
                        path="applications/manage"
                        element={<LogOut component={ManageApps} />}
                    />
                    <Route
                        path="applications/:id"
                        element={<LogOut component={AppsDevice} />}
                    />
                    <Route
                        path=":type/:id"
                        element={<LogOut component={Ubications} />}
                    />
                    <Route
                        path="gallery/:code"
                        element={<LogOut component={Gallery} />}
                    />
                    <Route
                        path="groups"
                        element={<LogOut component={Groups} />}
                    />
                    <Route
                        path="group/:id"
                        element={<LogOut component={DashboardGroup} />}
                    />
                    <Route
                        path="preferences/configs"
                        element={<LogOut component={Configs} />}
                    />
                    <Route
                        path="preferences/lost"
                        element={<LogOut component={Locked} />}
                    />
                    <Route
                        path="preferences/server"
                        element={<LogOut component={Server} />}
                    />
                    <Route
                        path="preferences/reports"
                        element={<LogOut component={Reports} />}
                    />
                    <Route
                        path="users"
                        element={<LogOut component={Users} />}
                    />
                    <Route
                        path="safeweb"
                        element={<LogOut component={SafeWeb} />}
                    />
                    <Route
                        path="safeweb/preferences"
                        element={<LogOut component={PreferencesSafeweb} />}
                    />
                    <Route
                        path="lists"
                        element={<LogOut component={Listas} />}
                    />
                    <Route
                        path="words"
                        element={<LogOut component={Words} />}
                    />
                </Route>
            </Routes>
            {/* Control Sidebar */}
            <aside className="control-sidebar control-sidebar-dark">
                {/* Control sidebar content goes here */}
            </aside>
        </div>
    );
};

export default App;
