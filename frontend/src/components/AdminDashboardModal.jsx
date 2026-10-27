import React, { useState, useEffect } from 'react';
import {
  X,
  Lock,
  User,
  Eye,
  EyeOff,
  Download,
  Search,
  Filter,
  Trash2,
  RefreshCw,
  ExternalLink,
  ShieldAlert,
  ShieldCheck,
  Users,
  CheckCircle,
  Calendar,
  LogOut,
} from 'lucide-react';
import {
  adminLogin,
  getAdminRegistrations,
  getAdminExportCSVUrl,
  deleteAdminRegistration,
  getKeralaDistricts,
  getBackendBase,
  setCustomBackendUrl,
  pingBackend,
} from '../services/api';

export default function AdminDashboardModal({ isOpen, onClose }) {
  const [adminKey, setAdminKey] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [usernameInput, setUsernameInput] = useState('admin');
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Backend Connection Settings
  const [backendUrl, setBackendUrl] = useState(getBackendBase() || '');
  const [showServerSettings, setShowServerSettings] = useState(false);
  const [pingStatus, setPingStatus] = useState(null);
  const [isPinging, setIsPinging] = useState(false);

  // Registrations & Filters
  const [registrations, setRegistrations] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [search, setSearch] = useState('');
  const [district, setDistrict] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [districts, setDistricts] = useState([]);

  useEffect(() => {
    getKeralaDistricts().then((d) => setDistricts(d));
  }, []);

  useEffect(() => {
    if (isOpen) {
      // Check active session authentication
      const sessionAuth = sessionStorage.getItem('tz_admin_session_auth') === 'true';
      const storedKey = (sessionStorage.getItem('tz_admin_key') || '').trim();

      if (sessionAuth && storedKey === 'travelzync_admin_2026') {
        setAdminKey(storedKey);
        setIsAuthenticated(true);
        loadData(storedKey);
      } else {
        // Strict: Always require administrator login
        setIsAuthenticated(false);
        setAdminKey('');
        setPasswordInput('');
        setErrorMsg('');
      }
    }
  }, [isOpen]);

  const loadData = async (key) => {
    const cleanKey = (key || '').trim();
    if (!cleanKey || cleanKey !== 'travelzync_admin_2026') {
      setIsAuthenticated(false);
      setErrorMsg('Access Denied: Invalid administrator password. Access restricted.');
      return;
    }

    setIsLoading(true);
    setErrorMsg('');

    try {
      const res = await getAdminRegistrations(cleanKey, {
        search,
        district,
        date_from: dateFrom,
        date_to: dateTo,
      });

      setIsLoading(false);

      if (res.ok) {
        setIsAuthenticated(true);
        setRegistrations(res.data.registrations || []);
        setTotalCount(res.data.total_count || 0);
      } else {
        setIsAuthenticated(false);
        setErrorMsg(res.data?.error || res.data?.message || 'Access Denied: Invalid administrator credentials.');
      }
    } catch (err) {
      setIsLoading(false);
      setIsAuthenticated(false);
      setErrorMsg('Could not connect to backend server. Make sure your Render backend service is awake and active.');
    }
  };

  const handleTestConnection = async () => {
    setIsPinging(true);
    setPingStatus(null);
    const res = await pingBackend(backendUrl);
    setIsPinging(false);
    if (res.ok) {
      setCustomBackendUrl(backendUrl);
      setPingStatus({ ok: true, message: 'Backend connected successfully!' });
    } else {
      setPingStatus({ ok: false, message: res.error || 'Connection failed' });
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const cleanPassword = (passwordInput || '').trim();
    const cleanUsername = (usernameInput || '').trim() || 'admin';

    if (!cleanPassword) {
      setErrorMsg('Please enter your administrator password.');
      return;
    }

    if (cleanPassword !== 'travelzync_admin_2026') {
      setIsAuthenticated(false);
      setAdminKey('');
      sessionStorage.removeItem('tz_admin_key');
      sessionStorage.removeItem('tz_admin_session_auth');
      setErrorMsg('Access Denied: Invalid administrator password. Without the authorized password, access to the admin dashboard is prohibited.');
      return;
    }

    if (backendUrl) {
      setCustomBackendUrl(backendUrl);
    }

    setIsLoading(true);
    setErrorMsg('');

    try {
      const loginRes = await adminLogin(cleanUsername, cleanPassword);

      if (!loginRes.ok) {
        setIsLoading(false);
        setIsAuthenticated(false);
        setErrorMsg(loginRes.data?.error || 'Authentication Failed: Invalid administrator credentials.');
        return;
      }

      setAdminKey(cleanPassword);
      setIsAuthenticated(true);
      sessionStorage.setItem('tz_admin_key', cleanPassword);
      sessionStorage.setItem('tz_admin_session_auth', 'true');
      sessionStorage.setItem('tz_admin_username', cleanUsername);

      await loadData(cleanPassword);
    } catch (err) {
      setIsLoading(false);
      setIsAuthenticated(false);
      setErrorMsg('Could not connect to backend server. Ensure backend is running.');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('tz_admin_key');
    sessionStorage.removeItem('tz_admin_session_auth');
    sessionStorage.removeItem('tz_admin_username');
    localStorage.removeItem('tz_admin_key');
    setAdminKey('');
    setIsAuthenticated(false);
    setPasswordInput('');
    setErrorMsg('');
  };

  const handleDelete = async (id) => {
    if (window.confirm(`Are you sure you want to delete registration #${id}?`)) {
      await deleteAdminRegistration(adminKey, id);
      loadData(adminKey);
    }
  };

  const handleExportCSV = () => {
    const url = getAdminExportCSVUrl(adminKey, { search, district });
    window.open(url, '_blank');
  };

  if (!isOpen) return null;

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      style={{ backgroundColor: 'rgba(17, 24, 39, 0.85)', zIndex: 1080 }}
      onClick={onClose}
    >
      <div
        className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content border-0 rounded-4 shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="modal-header bg-dark text-white border-0 px-3 px-sm-4 py-3 d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center gap-2 gap-sm-2.5">
              <img
                src="/travelzync_logo_clean.png"
                alt="TravelZync Official Logo"
                style={{ width: '32px', height: '32px', objectFit: 'contain', borderRadius: '7px' }}
              />
              <div>
                <h5 className="modal-title fw-bold fs-6 mb-0">
                  {isAuthenticated ? 'Admin Management Portal' : 'Administrator Login'}
                </h5>
                <span className="text-white-50" style={{ fontSize: '0.75rem' }}>
                  {isAuthenticated ? 'Waitlist Database & Commuter Registrations' : 'Authorized Personnel Sign In'}
                </span>
              </div>
            </div>

            <div className="d-flex align-items-center gap-2">
              {isAuthenticated && (
                <>
                  <a
                    href="http://127.0.0.1:8000/admin/"
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-sm btn-outline-light d-none d-sm-flex align-items-center gap-1 rounded-pill"
                    style={{ fontSize: '0.78rem' }}
                  >
                    <ExternalLink size={13} />
                    <span>Django Admin</span>
                  </a>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-danger d-flex align-items-center gap-1 rounded-pill px-2.5"
                    style={{ fontSize: '0.78rem' }}
                    onClick={handleLogout}
                    title="Log Out of Admin Portal"
                  >
                    <LogOut size={13} />
                    <span>Log Out</span>
                  </button>
                </>
              )}
              <button
                type="button"
                className="btn btn-outline-secondary btn-sm rounded-circle p-1 text-white border-0"
                onClick={onClose}
                title="Close modal"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Modal Body */}
          <div className="modal-body p-3 p-sm-4 bg-light" style={{ minHeight: '420px' }}>
            {!isAuthenticated ? (
              /* LOGIN SCREEN */
              <div className="mx-auto my-2 my-sm-4 p-3.5 p-sm-4 p-md-5 rounded-4 bg-white border shadow-sm text-center" style={{ maxWidth: '440px' }}>
                <div className="d-inline-flex p-2.5 rounded-circle bg-light border mb-2.5 shadow-2xs">
                  <img
                    src="/travelzync_logo_clean.png"
                    alt="TravelZync"
                    style={{ width: '44px', height: '44px', objectFit: 'contain' }}
                  />
                </div>

                <div className="mb-3">
                  <span className="badge rounded-pill bg-danger-subtle text-danger px-3 py-1 fw-semibold small mb-2" style={{ fontSize: '0.72rem', letterSpacing: '0.05em' }}>
                    RESTRICTED ADMIN ACCESS
                  </span>
                  <h4 className="fw-bold text-dark mb-1 fs-5">Admin Portal Login</h4>
                  <p className="text-muted small mb-0" style={{ fontSize: '0.825rem' }}>
                    Enter administrator credentials to manage waitlist registrations.
                  </p>
                </div>

                {errorMsg && (
                  <div className="alert alert-danger py-2 px-3 small text-start mb-3 d-flex align-items-start gap-2 rounded-3 border-danger-subtle">
                    <ShieldAlert size={16} className="text-danger flex-shrink-0 mt-0.5" />
                    <div style={{ fontSize: '0.8rem', lineHeight: 1.4 }}>{errorMsg}</div>
                  </div>
                )}

                <form onSubmit={handleLogin} className="text-start">
                  <div className="mb-2.5">
                    <label className="form-label small fw-semibold text-dark mb-1" style={{ fontSize: '0.8rem' }}>
                      Administrator Username
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-light text-muted border-end-0 px-2.5">
                        <User size={16} />
                      </span>
                      <input
                        type="text"
                        className="form-control border-start-0 ps-1"
                        placeholder="Admin username"
                        value={usernameInput}
                        onChange={(e) => setUsernameInput(e.target.value)}
                        required
                        autoFocus
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label small fw-semibold text-dark mb-1" style={{ fontSize: '0.8rem' }}>
                      Admin Password
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-light text-muted border-end-0 px-2.5">
                        <Lock size={16} />
                      </span>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        className="form-control border-start-0 border-end-0 ps-1"
                        placeholder="Enter administrator password"
                        value={passwordInput}
                        onChange={(e) => {
                          setPasswordInput(e.target.value);
                          if (errorMsg) setErrorMsg('');
                        }}
                        required
                      />
                      <button
                        type="button"
                        className="btn btn-outline-secondary border-start-0"
                        onClick={() => setShowPassword(!showPassword)}
                        title={showPassword ? 'Hide password' : 'Show password'}
                        tabIndex="-1"
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-tz-primary w-100 py-2.5 justify-content-center fw-semibold d-flex align-items-center gap-2 mt-3 shadow-sm"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <RefreshCw size={16} className="spin" />
                        <span>Verifying Credentials...</span>
                      </>
                    ) : (
                      <>
                        <ShieldCheck size={17} />
                        <span>Sign In as Administrator</span>
                      </>
                    )}
                  </button>
                </form>

                <div className="text-muted small mt-3" style={{ fontSize: '0.74rem', lineHeight: 1.45 }}>
                  🔒 Authorized personnel only. Without the authorized password, access to this dashboard is strictly prohibited.
                </div>

                {/* Render / Custom Backend Connection Manager */}
                <div className="mt-3 pt-2.5 border-top text-start">
                  <div className="d-flex align-items-center justify-content-between">
                    <button
                      type="button"
                      className="btn btn-link p-0 text-muted small text-decoration-none d-flex align-items-center gap-1.5"
                      onClick={() => setShowServerSettings(!showServerSettings)}
                      style={{ fontSize: '0.78rem' }}
                    >
                      <span>⚙️ Backend Server URL</span>
                      <span className="badge bg-light text-secondary border">
                        {backendUrl ? 'Custom' : 'Auto'}
                      </span>
                    </button>
                    {backendUrl && (
                      <span className="text-success small" style={{ fontSize: '0.7rem' }}>
                        Active
                      </span>
                    )}
                  </div>

                  {showServerSettings && (
                    <div className="mt-2 p-2.5 rounded-3 bg-light border">
                      <label className="form-label small fw-semibold text-dark mb-1" style={{ fontSize: '0.75rem' }}>
                        Render Web Service URL:
                      </label>
                      <input
                        type="url"
                        className="form-control form-control-sm mb-2"
                        placeholder="e.g. https://travelzync-backend.onrender.com"
                        value={backendUrl}
                        onChange={(e) => {
                          setBackendUrl(e.target.value);
                          setPingStatus(null);
                        }}
                      />
                      <div className="d-flex align-items-center gap-2">
                        <button
                          type="button"
                          className="btn btn-outline-dark btn-sm py-1 px-2.5"
                          style={{ fontSize: '0.75rem' }}
                          onClick={handleTestConnection}
                          disabled={isPinging}
                        >
                          {isPinging ? 'Pinging...' : 'Test & Save URL'}
                        </button>
                        {backendUrl && (
                          <button
                            type="button"
                            className="btn btn-link btn-sm p-0 text-danger text-decoration-none small"
                            style={{ fontSize: '0.75rem' }}
                            onClick={() => {
                              setBackendUrl('');
                              setCustomBackendUrl('');
                              setPingStatus(null);
                            }}
                          >
                            Reset to default
                          </button>
                        )}
                      </div>

                      {pingStatus && (
                        <div
                          className={`mt-2 p-1.5 rounded-2 small ${
                            pingStatus.ok ? 'bg-success-subtle text-success' : 'bg-danger-subtle text-danger'
                          }`}
                          style={{ fontSize: '0.74rem' }}
                        >
                          {pingStatus.ok ? '✓ ' : '⚠️ '}{pingStatus.message}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              /* ADMIN DASHBOARD INTERFACE */
              <div>
                {/* Stats Bar */}
                <div className="row g-2.5 mb-3 mb-sm-4">
                  <div className="col-12 col-md-4">
                    <div className="p-3 bg-white rounded-3 border shadow-xs d-flex align-items-center justify-content-between">
                      <div>
                        <div className="text-muted small fw-semibold">Total Filtered Records</div>
                        <div className="fs-4 fw-extrabold text-dark">{totalCount}</div>
                      </div>
                      <div className="p-2 rounded-3 bg-tz-red-light text-tz-red">
                        <Users size={22} />
                      </div>
                    </div>
                  </div>

                  <div className="col-12 col-md-4">
                    <div className="p-3 bg-white rounded-3 border shadow-xs d-flex align-items-center justify-content-between">
                      <div>
                        <div className="text-muted small fw-semibold">Export Format</div>
                        <div className="fs-6 fw-bold text-dark">Standard UTF-8 CSV</div>
                      </div>
                      <button
                        className="btn btn-tz-primary btn-sm px-3 py-1.5"
                        onClick={handleExportCSV}
                      >
                        <Download size={14} />
                        <span>Export CSV</span>
                      </button>
                    </div>
                  </div>

                  <div className="col-12 col-md-4">
                    <div className="p-3 bg-white rounded-3 border shadow-xs d-flex align-items-center justify-content-between">
                      <div>
                        <div className="text-muted small fw-semibold">Session Status</div>
                        <div className="fs-6 fw-bold text-success d-flex align-items-center gap-1">
                          <CheckCircle size={15} /> Active Admin Session
                        </div>
                      </div>
                      <button
                        className="btn btn-outline-danger btn-sm rounded-pill px-3"
                        onClick={handleLogout}
                      >
                        Lock
                      </button>
                    </div>
                  </div>
                </div>

                {/* Filters & Search Control Bar */}
                <div className="p-2.5 p-sm-3 bg-white rounded-3 border shadow-xs mb-3">
                  <div className="row g-2 align-items-center">
                    <div className="col-12 col-md-4">
                      <div className="input-group input-group-sm">
                        <span className="input-group-text bg-light border-end-0 px-2">
                          <Search size={14} className="text-muted" />
                        </span>
                        <input
                          type="text"
                          className="form-control border-start-0"
                          placeholder="Search email, name or phone..."
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="col-12 col-md-3">
                      <select
                        className="form-select form-select-sm"
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                      >
                        <option value="">All Kerala Districts</option>
                        {districts.map((d) => (
                          <option key={d.code} value={d.code}>
                            {d.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col-8 col-md-3 d-flex gap-1">
                      <input
                        type="date"
                        className="form-control form-control-sm"
                        value={dateFrom}
                        onChange={(e) => setDateFrom(e.target.value)}
                        title="From Date"
                      />
                      <input
                        type="date"
                        className="form-control form-control-sm"
                        value={dateTo}
                        onChange={(e) => setDateTo(e.target.value)}
                        title="To Date"
                      />
                    </div>

                    <div className="col-4 col-md-2 d-flex gap-1.5">
                      <button
                        className="btn btn-dark btn-sm flex-grow-1"
                        onClick={() => loadData(adminKey)}
                      >
                        Filter
                      </button>
                      <button
                        className="btn btn-outline-secondary btn-sm p-1.5"
                        title="Reset Filters"
                        onClick={() => {
                          setSearch('');
                          setDistrict('');
                          setDateFrom('');
                          setDateTo('');
                          loadData(adminKey);
                        }}
                      >
                        <RefreshCw size={14} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Registrations Table */}
                <div className="bg-white rounded-3 border shadow-xs overflow-hidden">
                  <div className="table-responsive" style={{ maxHeight: '380px' }}>
                    <table className="table table-hover align-middle mb-0" style={{ fontSize: '0.85rem' }}>
                      <thead className="table-light sticky-top">
                        <tr>
                          <th className="py-2.5 ps-3">Queue #</th>
                          <th className="py-2.5">Email Address</th>
                          <th className="py-2.5">Full Name</th>
                          <th className="py-2.5">Phone Number</th>
                          <th className="py-2.5">District</th>
                          <th className="py-2.5">Registered Date</th>
                          <th className="py-2.5 text-end pe-3">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {isLoading ? (
                          <tr>
                            <td colSpan="7" className="text-center py-4 text-muted">
                              <span className="spinner-border spinner-border-sm me-2" />
                              Loading registrations...
                            </td>
                          </tr>
                        ) : registrations.length === 0 ? (
                          <tr>
                            <td colSpan="7" className="text-center py-4 text-muted">
                              No registrations found matching criteria.
                            </td>
                          </tr>
                        ) : (
                          registrations.map((row) => (
                            <tr key={row.id}>
                              <td className="ps-3 fw-bold text-tz-red">
                                #{row.queue_number || row.id}
                              </td>
                              <td className="fw-semibold text-dark">{row.email}</td>
                              <td>{row.full_name || '—'}</td>
                              <td>{row.phone_number || '—'}</td>
                              <td>
                                {row.district ? (
                                  <span className="badge bg-light text-dark border">
                                    {row.district}
                                  </span>
                                ) : (
                                  <span className="text-muted">—</span>
                                )}
                              </td>
                              <td className="text-muted small">
                                {new Date(row.created_at).toLocaleDateString()}
                              </td>
                              <td className="text-end pe-3">
                                <button
                                  className="btn btn-outline-danger btn-sm p-1 rounded-circle"
                                  title="Delete Entry"
                                  onClick={() => handleDelete(row.id)}
                                >
                                  <Trash2 size={13} />
                                </button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
