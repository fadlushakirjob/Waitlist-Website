import React, { useState, useEffect } from 'react';
import {
  X,
  Lock,
  Download,
  Search,
  Filter,
  Trash2,
  RefreshCw,
  ExternalLink,
  ShieldAlert,
  Users,
  CheckCircle,
  Calendar,
} from 'lucide-react';
import {
  getAdminRegistrations,
  getAdminExportCSVUrl,
  deleteAdminRegistration,
  getKeralaDistricts,
} from '../services/api';

export default function AdminDashboardModal({ isOpen, onClose }) {
  const [adminKey, setAdminKey] = useState(
    localStorage.getItem('tz_admin_key') || ''
  );
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [keyInput, setKeyInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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
    if (adminKey && isOpen) {
      loadData(adminKey);
    }
  }, [adminKey, isOpen]);

  const loadData = async (key) => {
    setIsLoading(true);
    setErrorMsg('');

    const res = await getAdminRegistrations(key, {
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
      localStorage.setItem('tz_admin_key', key);
    } else {
      setIsAuthenticated(false);
      setErrorMsg(res.data?.error || 'Invalid Admin Access Key.');
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!keyInput) {
      setErrorMsg('Please enter the Admin Key.');
      return;
    }
    setAdminKey(keyInput);
    loadData(keyInput);
  };

  const handleLogout = () => {
    localStorage.removeItem('tz_admin_key');
    setAdminKey('');
    setIsAuthenticated(false);
    setKeyInput('');
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
        className="modal-dialog modal-dialog-centered modal-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content border-0 rounded-4 shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="modal-header bg-dark text-white border-0 px-4 py-3 d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center gap-2.5">
              <img
                src="/travelzync_logo_clean.png"
                alt="TravelZync Official Logo"
                style={{ width: '32px', height: '32px', objectFit: 'contain', borderRadius: '7px' }}
              />
              <div>
                <h5 className="modal-title fw-bold fs-6 mb-0">TravelZync Admin Management Portal</h5>
                <span className="text-white-50" style={{ fontSize: '0.75rem' }}>
                  Waitlist Database & Commuter Registrations
                </span>
              </div>
            </div>

            <div className="d-flex align-items-center gap-2">
              {isAuthenticated && (
                <a
                  href="http://127.0.0.1:8000/admin/"
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-sm btn-outline-light d-flex align-items-center gap-1 rounded-pill"
                >
                  <ExternalLink size={13} />
                  <span>Django Admin</span>
                </a>
              )}
              <button
                type="button"
                className="btn btn-outline-secondary btn-sm rounded-circle p-1 text-white border-0"
                onClick={onClose}
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Modal Body */}
          <div className="modal-body p-4 bg-light" style={{ minHeight: '480px' }}>
            {!isAuthenticated ? (
              /* LOGIN SCREEN */
              <div className="max-w-md mx-auto my-5 p-4 rounded-4 bg-white border shadow-sm text-center" style={{ maxWidth: '420px' }}>
                <img
                  src="/travelzync_logo_clean.png"
                  alt="TravelZync"
                  style={{ width: '64px', height: '64px', objectFit: 'contain', borderRadius: '12px', marginBottom: '1rem' }}
                />
                <h4 className="fw-bold text-dark mb-1">Authorized Staff Login</h4>
                <p className="text-muted small mb-4">
                  Enter your team security key to access waitlist records.
                </p>

                {errorMsg && (
                  <div className="alert alert-danger py-2 px-3 small text-start mb-3">
                    {errorMsg}
                  </div>
                )}

                <form onSubmit={handleLogin}>
                  <div className="mb-3 text-start">
                    <label className="form-label small fw-semibold text-dark">
                      Admin Security Key
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Enter admin key (default: travelzync_admin_2026)"
                      value={keyInput}
                      onChange={(e) => setKeyInput(e.target.value)}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-tz-primary w-100 py-2 justify-content-center"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Verifying...' : 'Unlock Admin Dashboard'}
                  </button>
                </form>

                <div className="text-muted small mt-3" style={{ fontSize: '0.75rem' }}>
                  Default Access Key: <code>travelzync_admin_2026</code>
                </div>
              </div>
            ) : (
              /* ADMIN DASHBOARD INTERFACE */
              <div>
                {/* Stats Bar */}
                <div className="row g-3 mb-4">
                  <div className="col-md-4">
                    <div className="p-3 bg-white rounded-3 border shadow-2xs d-flex align-items-center justify-content-between">
                      <div>
                        <div className="text-muted small fw-semibold">Total Filtered Records</div>
                        <div className="fs-4 fw-extrabold text-dark">{totalCount}</div>
                      </div>
                      <div className="p-2 rounded-3 bg-tz-red-light text-tz-red">
                        <Users size={24} />
                      </div>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="p-3 bg-white rounded-3 border shadow-2xs d-flex align-items-center justify-content-between">
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

                  <div className="col-md-4">
                    <div className="p-3 bg-white rounded-3 border shadow-2xs d-flex align-items-center justify-content-between">
                      <div>
                        <div className="text-muted small fw-semibold">Session Status</div>
                        <div className="fs-6 fw-bold text-success d-flex align-items-center gap-1">
                          <CheckCircle size={15} /> Active Admin Session
                        </div>
                      </div>
                      <button
                        className="btn btn-outline-danger btn-sm rounded-pill"
                        onClick={handleLogout}
                      >
                        Lock
                      </button>
                    </div>
                  </div>
                </div>

                {/* Filters & Search Control Bar */}
                <div className="p-3 bg-white rounded-3 border shadow-2xs mb-3">
                  <div className="row g-2 align-items-center">
                    <div className="col-md-4">
                      <div className="input-group input-group-sm">
                        <span className="input-group-text bg-light border-end-0">
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

                    <div className="col-md-3">
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

                    <div className="col-md-3 d-flex gap-1">
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

                    <div className="col-md-2 d-flex gap-2">
                      <button
                        className="btn btn-dark btn-sm flex-grow-1"
                        onClick={() => loadData(adminKey)}
                      >
                        Apply Filter
                      </button>
                      <button
                        className="btn btn-outline-secondary btn-sm"
                        title="Refresh"
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
                <div className="bg-white rounded-3 border shadow-2xs overflow-hidden">
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
