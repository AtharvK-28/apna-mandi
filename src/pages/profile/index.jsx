import React, { useState, useRef } from 'react';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

/* ─── tiny helpers ─────────────────────────────────────────────────────────── */
const Avatar = ({ name, src, size = 96 }) => {
  const initials = name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  const colors = ['#C84B31', '#E25E3E', '#D4622A', '#B94025'];
  const color = colors[name.charCodeAt(0) % colors.length];
  return src ? (
    <img src={src} alt={name} style={{ width: size, height: size }}
      className="rounded-full object-cover ring-4 ring-white shadow-lg" />
  ) : (
    <div
      className="rounded-full ring-4 ring-white shadow-lg flex items-center justify-center text-white font-bold"
      style={{ width: size, height: size, backgroundColor: color, fontSize: size * 0.35 }}>
      {initials}
    </div>
  );
};

const Badge = ({ icon, label, color }) => (
  <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${color}`}>
    <span>{icon}</span>
    <span>{label}</span>
  </div>
);

const StatCard = ({ icon, value, label, accent }) => (
  <div className="bg-white rounded-2xl p-4 border border-stone-100 shadow-sm flex flex-col items-center gap-1 text-center">
    <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-1 ${accent}`}>
      <Icon name={icon} size={18} className="text-white" />
    </div>
    <span className="text-xl font-bold text-stone-800">{value}</span>
    <span className="text-xs text-stone-400 font-medium">{label}</span>
  </div>
);

const SectionHead = ({ title, action, onAction }) => (
  <div className="flex items-center justify-between mb-4">
    <h3 className="text-sm font-bold text-stone-500 uppercase tracking-widest">{title}</h3>
    {action && (
      <button onClick={onAction} className="text-xs text-orange-600 font-semibold hover:text-orange-700 transition-colors flex items-center gap-1">
        {action} <Icon name="ChevronRight" size={13} />
      </button>
    )}
  </div>
);

const Field = ({ label, value, icon, editing, onChange, type = 'text', readonly }) => (
  <div className="group">
    <div className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-1.5">{label}</div>
    {editing && !readonly ? (
      <div className="relative">
        <Icon name={icon} size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
        <input
          type={type}
          value={value}
          onChange={e => onChange(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 bg-orange-50 border border-orange-200 rounded-xl text-stone-800 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
        />
      </div>
    ) : (
      <div className="flex items-center gap-2.5 py-2 px-1">
        <Icon name={icon} size={15} className="text-stone-400 flex-shrink-0" />
        <span className="text-stone-800 font-medium text-sm">{value || '—'}</span>
        {readonly && <span className="ml-auto text-xs bg-stone-100 text-stone-400 px-2 py-0.5 rounded-full">Verified</span>}
      </div>
    )}
  </div>
);

const OrderRow = ({ order }) => {
  const statusConfig = {
    delivered:  { color: 'bg-green-100 text-green-700',  label: 'Delivered'  },
    processing: { color: 'bg-amber-100 text-amber-700',  label: 'Processing' },
    cancelled:  { color: 'bg-red-100 text-red-600',      label: 'Cancelled'  },
  };
  const s = statusConfig[order.status] || statusConfig.processing;
  return (
    <div className="flex items-center gap-3 py-3 border-b border-stone-100 last:border-0">
      <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0 text-lg">
        {order.emoji}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-stone-800 truncate">{order.name}</p>
        <p className="text-xs text-stone-400">{order.vendor} · {order.date}</p>
      </div>
      <div className="text-right flex-shrink-0">
        <p className="text-sm font-bold text-stone-800">₹{order.total}</p>
        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${s.color}`}>{s.label}</span>
      </div>
    </div>
  );
};

const Toggle = ({ label, description, value, onChange, icon }) => (
  <div className="flex items-center justify-between gap-4 py-3.5 border-b border-stone-100 last:border-0">
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 bg-stone-100 rounded-lg flex items-center justify-center">
        <Icon name={icon} size={15} className="text-stone-500" />
      </div>
      <div>
        <p className="text-sm font-semibold text-stone-800">{label}</p>
        {description && <p className="text-xs text-stone-400">{description}</p>}
      </div>
    </div>
    <button
      onClick={() => onChange(!value)}
      className={`relative w-11 h-6 rounded-full transition-colors duration-200 flex-shrink-0 ${value ? 'bg-orange-500' : 'bg-stone-200'}`}
    >
      <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${value ? 'translate-x-5' : 'translate-x-0.5'}`} />
    </button>
  </div>
);

/* ─── main component ────────────────────────────────────────────────────────── */
const Profile = () => {
  const fileRef = useRef(null);
  const [activeTab, setActiveTab] = useState('profile');
  const [editing, setEditing] = useState(false);
  const [avatarSrc, setAvatarSrc] = useState(null);
  const [saved, setSaved] = useState(false);

  const [profile, setProfile] = useState({
    name:     'Rajesh Kumar',
    email:    'rajesh@example.com',
    phone:    '+91 9876543210',
    location: 'Dadar, Mumbai',
    bio:      'Street food enthusiast & early morning deal hunter 🛒',
    userType: 'vendor',
  });
  const [draft, setDraft] = useState({ ...profile });

  const [settings, setSettings] = useState({
    dealAlerts:    true,
    orderUpdates:  true,
    newsletter:    false,
    locationShare: true,
    darkMode:      false,
  });

  const stats = [
    { icon: 'ShoppingBag', value: '47',   label: 'Orders',    accent: 'bg-orange-500' },
    { icon: 'Star',        value: '4.9',  label: 'Rating',    accent: 'bg-amber-500'  },
    { icon: 'Heart',       value: '23',   label: 'Saved',     accent: 'bg-rose-500'   },
    { icon: 'Zap',         value: '₹12k', label: 'Saved ₹',   accent: 'bg-emerald-500'},
  ];

  const badges = [
    { icon: '🔥', label: 'Power Buyer',   color: 'bg-orange-50 text-orange-700 border-orange-200' },
    { icon: '⭐', label: 'Top Reviewer',  color: 'bg-amber-50  text-amber-700  border-amber-200'  },
    { icon: '🌱', label: 'Early Adopter', color: 'bg-green-50  text-green-700  border-green-200'  },
    { icon: '🏆', label: 'Deal Hunter',   color: 'bg-blue-50   text-blue-700   border-blue-200'   },
  ];

  const orders = [
    { id:1, emoji:'🥬', name:'Fresh Spinach Bulk Pack',   vendor:'Green Valley',     date:'Today',      total:340,  status:'processing' },
    { id:2, emoji:'🍅', name:'Organic Tomatoes 5kg',      vendor:'Farms Direct',     date:'Yesterday',  total:220,  status:'delivered'  },
    { id:3, emoji:'🌶️', name:"Aunty's Schezwan Chutney", vendor:"Aunty's Corner",   date:'23 Jan',     total:600,  status:'delivered'  },
    { id:4, emoji:'🧅', name:'Onion Bulk (20kg)',         vendor:'Mumbai Wholesale', date:'20 Jan',     total:480,  status:'delivered'  },
    { id:5, emoji:'🫚', name:'Sunflower Oil 5L',          vendor:'Pure Oils Co.',    date:'15 Jan',     total:720,  status:'cancelled'  },
  ];

  const handleSave = () => {
    setProfile({ ...draft });
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleCancel = () => {
    setDraft({ ...profile });
    setEditing(false);
  };

  const handleAvatar = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatarSrc(url);
    }
  };

  const setField = (k) => (v) => setDraft(p => ({ ...p, [k]: v }));

  const tabs = [
    { id: 'profile',  label: 'Profile',   icon: 'User'         },
    { id: 'orders',   label: 'Orders',    icon: 'ShoppingBag'  },
    { id: 'settings', label: 'Settings',  icon: 'Settings'     },
  ];

  return (
    <div className="min-h-screen bg-stone-50 font-sans">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=DM+Sans:wght@400;500;600&display=swap');
        .profile-root { font-family: 'DM Sans', sans-serif; }
        .profile-root h1, .profile-root h2, .profile-root h3 { font-family: 'Sora', sans-serif; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        .fade-up { animation: fadeUp 0.4s ease both; }
        .fade-up-1 { animation: fadeUp 0.4s 0.05s ease both; }
        .fade-up-2 { animation: fadeUp 0.4s 0.10s ease both; }
        .fade-up-3 { animation: fadeUp 0.4s 0.15s ease both; }
        .fade-up-4 { animation: fadeUp 0.4s 0.20s ease both; }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(8px); }
          to   { opacity: 1; transform: translateX(0);   }
        }
        .slide-in { animation: slideIn 0.3s ease both; }
      `}</style>

      <Header />

      <div className="profile-root">
        {/* ── Hero cover ─────────────────────────────────────────────────── */}
        <div className="relative h-44 md:h-56 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-700 via-orange-500 to-amber-400" />
          {/* Decorative pattern */}
          <svg className="absolute inset-0 w-full h-full opacity-10" preserveAspectRatio="xMidYMid slice">
            <defs>
              <pattern id="dots" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
                <circle cx="16" cy="16" r="2" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots)" />
          </svg>
          {/* Big decorative circles */}
          <div className="absolute -top-16 -right-16 w-64 h-64 bg-white/10 rounded-full" />
          <div className="absolute -bottom-10 right-1/3 w-40 h-40 bg-white/10 rounded-full" />
          {/* User type chip */}
          <div className="absolute top-4 right-4">
            <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full border border-white/30 uppercase tracking-wider">
              {profile.userType === 'vendor' ? '🏪 Vendor' : '🚚 Supplier'}
            </span>
          </div>
        </div>

        {/* ── Profile header ──────────────────────────────────────────────── */}
        <div className="max-w-2xl mx-auto px-4">
          <div className="relative -mt-14 mb-4 fade-up">
            <div className="flex items-end justify-between">
              {/* Avatar */}
              <div className="relative group cursor-pointer" onClick={() => fileRef.current?.click()}>
                <Avatar name={profile.name} src={avatarSrc} size={88} />
                <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Icon name="Camera" size={20} className="text-white" />
                </div>
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleAvatar} />
              </div>

              {/* Edit / Save buttons */}
              <div className="pb-1 flex gap-2">
                {editing ? (
                  <>
                    <button onClick={handleCancel}
                      className="px-4 py-2 text-sm font-semibold text-stone-600 bg-white border border-stone-200 rounded-xl hover:bg-stone-50 transition-colors">
                      Cancel
                    </button>
                    <button onClick={handleSave}
                      className="px-4 py-2 text-sm font-semibold text-white bg-orange-600 rounded-xl hover:bg-orange-700 transition-colors flex items-center gap-1.5 shadow-sm">
                      <Icon name="Check" size={15} />Save
                    </button>
                  </>
                ) : (
                  <button onClick={() => setEditing(true)}
                    className="px-4 py-2 text-sm font-semibold text-orange-700 bg-orange-50 border border-orange-200 rounded-xl hover:bg-orange-100 transition-colors flex items-center gap-1.5">
                    <Icon name="Pencil" size={14} />Edit Profile
                  </button>
                )}
              </div>
            </div>

            {/* Name + location */}
            <div className="mt-3">
              <h1 className="text-2xl font-bold text-stone-900">{profile.name}</h1>
              <div className="flex items-center gap-1.5 text-stone-500 text-sm mt-0.5">
                <Icon name="MapPin" size={13} />
                <span>{profile.location}</span>
                <span className="text-stone-300 mx-1">·</span>
                <span>Member since Jan 2024</span>
              </div>
              {profile.bio && (
                <p className="text-sm text-stone-600 mt-2 leading-relaxed">{profile.bio}</p>
              )}
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 mt-3">
              {badges.map(b => <Badge key={b.label} {...b} />)}
            </div>
          </div>

          {/* ── Stats row ─────────────────────────────────────────────────── */}
          <div className="grid grid-cols-4 gap-3 mb-5 fade-up-1">
            {stats.map(s => <StatCard key={s.label} {...s} />)}
          </div>

          {/* ── Tabs ──────────────────────────────────────────────────────── */}
          <div className="bg-white rounded-2xl border border-stone-100 shadow-sm mb-5 overflow-hidden fade-up-2">
            <div className="flex">
              {tabs.map(tab => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-2 py-3.5 text-sm font-semibold transition-all border-b-2 ${
                    activeTab === tab.id
                      ? 'border-orange-500 text-orange-600 bg-orange-50/50'
                      : 'border-transparent text-stone-400 hover:text-stone-600 hover:bg-stone-50'
                  }`}>
                  <Icon name={tab.icon} size={15} />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* ════════════════════════════════════════════════════════════════
              Profile Tab
          ════════════════════════════════════════════════════════════════ */}
          {activeTab === 'profile' && (
            <div className="space-y-4 slide-in pb-10">

              {/* Personal Info */}
              <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-5">
                <SectionHead title="Personal Info" />
                <div className="space-y-4">
                  <Field label="Full Name"     icon="User"    value={draft.name}     editing={editing} onChange={setField('name')}  />
                  <div className="border-t border-stone-100" />
                  <Field label="Email Address" icon="Mail"    value={draft.email}    editing={editing} onChange={setField('email')}   type="email" readonly />
                  <div className="border-t border-stone-100" />
                  <Field label="Phone Number"  icon="Phone"   value={draft.phone}    editing={editing} onChange={setField('phone')}   type="tel" readonly />
                  <div className="border-t border-stone-100" />
                  <Field label="Location"      icon="MapPin"  value={draft.location} editing={editing} onChange={setField('location')} />
                </div>
              </div>

              {/* Bio */}
              <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-5">
                <SectionHead title="About Me" />
                {editing ? (
                  <textarea
                    value={draft.bio}
                    onChange={e => setField('bio')(e.target.value)}
                    rows={3}
                    placeholder="Tell the community about yourself…"
                    className="w-full px-4 py-3 bg-orange-50 border border-orange-200 rounded-xl text-stone-800 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
                  />
                ) : (
                  <p className="text-sm text-stone-600 leading-relaxed">{profile.bio || 'No bio yet. Click Edit Profile to add one!'}</p>
                )}
              </div>

              {/* Account type */}
              <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-5">
                <SectionHead title="Account Type" />
                {editing ? (
                  <div className="grid grid-cols-2 gap-3">
                    {['vendor', 'supplier'].map(type => (
                      <button key={type} onClick={() => setField('userType')(type)}
                        className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                          draft.userType === type
                            ? 'border-orange-500 bg-orange-50 text-orange-700'
                            : 'border-stone-200 text-stone-500 hover:border-stone-300'
                        }`}>
                        <span className="text-2xl">{type === 'vendor' ? '🏪' : '🚚'}</span>
                        <span className="text-sm font-semibold capitalize">{type}</span>
                        <span className="text-xs text-center opacity-70">
                          {type === 'vendor' ? 'Street food stall owner' : 'Raw material supplier'}
                        </span>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-xl border border-orange-100">
                    <span className="text-2xl">{profile.userType === 'vendor' ? '🏪' : '🚚'}</span>
                    <div>
                      <p className="font-semibold text-stone-800 capitalize">{profile.userType}</p>
                      <p className="text-xs text-stone-500">
                        {profile.userType === 'vendor' ? 'Street food stall owner' : 'Raw material supplier'}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Danger zone */}
              <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-5">
                <SectionHead title="Account" />
                <div className="space-y-2">
                  <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-stone-50 transition-colors text-left group">
                    <div className="w-8 h-8 bg-stone-100 rounded-lg flex items-center justify-center group-hover:bg-stone-200 transition-colors">
                      <Icon name="Lock" size={15} className="text-stone-500" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-stone-800">Change Password</p>
                      <p className="text-xs text-stone-400">Update your login credentials</p>
                    </div>
                    <Icon name="ChevronRight" size={16} className="text-stone-300" />
                  </button>
                  <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-red-50 transition-colors text-left group">
                    <div className="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center group-hover:bg-red-100 transition-colors">
                      <Icon name="LogOut" size={15} className="text-red-500" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-red-600">Sign Out</p>
                      <p className="text-xs text-stone-400">Log out of your account</p>
                    </div>
                    <Icon name="ChevronRight" size={16} className="text-stone-300" />
                  </button>
                  <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-red-50 transition-colors text-left group">
                    <div className="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center group-hover:bg-red-100 transition-colors">
                      <Icon name="Trash2" size={15} className="text-red-500" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-red-600">Delete Account</p>
                      <p className="text-xs text-stone-400">Permanently remove your data</p>
                    </div>
                    <Icon name="ChevronRight" size={16} className="text-stone-300" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ════════════════════════════════════════════════════════════════
              Orders Tab
          ════════════════════════════════════════════════════════════════ */}
          {activeTab === 'orders' && (
            <div className="space-y-4 slide-in pb-10">
              {/* Summary chips */}
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                {[
                  { label: 'All Orders', count: 47, active: true  },
                  { label: 'Active',     count:  2, active: false },
                  { label: 'Delivered',  count: 43, active: false },
                  { label: 'Cancelled',  count:  2, active: false },
                ].map(chip => (
                  <button key={chip.label}
                    className={`flex-shrink-0 flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-semibold border transition-colors ${
                      chip.active
                        ? 'bg-orange-600 text-white border-orange-600'
                        : 'bg-white text-stone-600 border-stone-200 hover:border-stone-300'
                    }`}>
                    {chip.label}
                    <span className={`px-1.5 py-0.5 rounded-full text-xs ${chip.active ? 'bg-white/20 text-white' : 'bg-stone-100 text-stone-500'}`}>
                      {chip.count}
                    </span>
                  </button>
                ))}
              </div>

              {/* Orders list */}
              <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-4">
                {orders.map(o => <OrderRow key={o.id} order={o} />)}
              </div>

              <button className="w-full py-3 text-sm font-semibold text-orange-600 bg-white border border-stone-200 rounded-2xl hover:bg-orange-50 transition-colors flex items-center justify-center gap-2">
                <Icon name="Package" size={15} />View All Orders
              </button>
            </div>
          )}

          {/* ════════════════════════════════════════════════════════════════
              Settings Tab
          ════════════════════════════════════════════════════════════════ */}
          {activeTab === 'settings' && (
            <div className="space-y-4 slide-in pb-10">
              <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-5">
                <SectionHead title="Notifications" />
                <Toggle label="Deal Alerts"    description="Get notified about flash deals near you" icon="Bell"      value={settings.dealAlerts}    onChange={v => setSettings(p=>({...p,dealAlerts:v}))}    />
                <Toggle label="Order Updates"  description="Status changes on your orders"            icon="Package"   value={settings.orderUpdates}  onChange={v => setSettings(p=>({...p,orderUpdates:v}))}  />
                <Toggle label="Newsletter"     description="Weekly digest of deals & stories"         icon="Mail"      value={settings.newsletter}    onChange={v => setSettings(p=>({...p,newsletter:v}))}    />
              </div>

              <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-5">
                <SectionHead title="Privacy & App" />
                <Toggle label="Share Location"  description="Help us show nearby deals"  icon="MapPin"  value={settings.locationShare} onChange={v => setSettings(p=>({...p,locationShare:v}))} />
                <Toggle label="Dark Mode"        description="Easy on the eyes at night"  icon="Moon"    value={settings.darkMode}      onChange={v => setSettings(p=>({...p,darkMode:v}))}      />
              </div>

              <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-5">
                <SectionHead title="Support" />
                {[
                  { icon: 'HelpCircle',  label: 'Help & FAQ',        sub: 'Common questions answered'    },
                  { icon: 'MessageCircle', label: 'Contact Support',  sub: 'Chat with our team'           },
                  { icon: 'FileText',    label: 'Privacy Policy',    sub: 'How we use your data'         },
                  { icon: 'Shield',      label: 'Terms of Service',  sub: 'Our rules & guidelines'       },
                ].map(item => (
                  <button key={item.label} className="w-full flex items-center gap-3 py-3.5 border-b border-stone-100 last:border-0 hover:bg-stone-50 -mx-1 px-1 rounded-xl transition-colors text-left">
                    <div className="w-8 h-8 bg-stone-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name={item.icon} size={15} className="text-stone-500" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-stone-800">{item.label}</p>
                      <p className="text-xs text-stone-400">{item.sub}</p>
                    </div>
                    <Icon name="ChevronRight" size={15} className="text-stone-300" />
                  </button>
                ))}
              </div>

              <div className="text-center py-2 pb-10">
                <p className="text-xs text-stone-300">Apna Mandi v2.4.1 · Made with ❤️ in India</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Save toast ─────────────────────────────────────────────────────── */}
      {saved && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-stone-900 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 text-sm font-semibold z-50 animate-bounce">
          <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
            <Icon name="Check" size={12} className="text-white" />
          </div>
          Profile saved successfully
        </div>
      )}
    </div>
  );
};

export default Profile;