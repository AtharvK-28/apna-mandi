import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Icon from '../../components/AppIcon';
import Header from '../../components/ui/Header';
import { useCart } from '../../contexts/CartContext';

const KarigarConnect = () => {
  const { cartCount } = useCart();
  const [activeTab, setActiveTab] = useState('gigs');
  const [showKarigarModal, setShowKarigarModal] = useState(false);
  const [showGigModal, setShowGigModal] = useState(false);
  const [selectedGig, setSelectedGig] = useState(null);
  const [filterType, setFilterType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showKarigarProfileModal, setShowKarigarProfileModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [selectedKarigar, setSelectedKarigar] = useState(null);
  const [applications, setApplications] = useState([]);
  const [messages, setMessages] = useState([]);
  const [showApplicationSuccess, setShowApplicationSuccess] = useState(false);

  const [availableGigs, setAvailableGigs] = useState([
    {
      id: 1,
      title: "Emergency Juice Stall Cover",
      vendor: "Rajesh Juice Corner",
      vendorPhone: "+91 98765 43210",
      vendorRating: 4.8,
      vendorLocation: "Dadar Station West",
      gigType: "emergency",
      skills: ["Juice Making", "Cash Handling", "Customer Service"],
      description: "Need someone to run my juice stall for the evening rush. Must know how to operate juicer and handle cash transactions.",
      date: "Today",
      time: "5:00 PM - 10:00 PM",
      duration: "5 hours",
      rate: 150,
      totalPay: 750,
      urgency: "high",
      distance: "200m away",
      applicants: 3,
      status: "open",
      postedAt: "2 hours ago",
      foodImage: "/assets/images/orange.jpeg"
    },
    {
      id: 2,
      title: "Bulk Vegetable Chopping Help",
      vendor: "Mumbai Chinese Corner",
      vendorPhone: "+91 98765 43211",
      vendorRating: 4.6,
      vendorLocation: "Bandra Market",
      gigType: "prep",
      skills: ["Vegetable Chopping", "Bulk Prep", "Kitchen Organization"],
      description: "Need help with bulk chopping for my Chinese stall. Task: 20kg vegetables (onions, carrots, cabbage).",
      date: "Tomorrow",
      time: "8:00 AM - 10:00 AM",
      duration: "2 hours",
      rate: 120,
      totalPay: 240,
      urgency: "medium",
      distance: "500m away",
      applicants: 5,
      status: "open",
      postedAt: "4 hours ago",
      foodImage: "/assets/images/onions.jpeg"
    },
    {
      id: 3,
      title: "Dosa Master Training Session",
      vendor: "Pav Bhaji King",
      vendorPhone: "+91 98765 43212",
      vendorRating: 4.9,
      vendorLocation: "Andheri Station",
      gigType: "training",
      skills: ["Dosa Making", "Tawa Handling", "Batter Preparation"],
      description: "Need a 'Dosa Master' to train me on my new tawa. Want to add dosas to my menu. Premium skill training required.",
      date: "Tuesday",
      time: "3:00 PM - 5:00 PM",
      duration: "2 hours",
      rate: 600,
      totalPay: 1200,
      urgency: "low",
      distance: "300m away",
      applicants: 1,
      status: "open",
      postedAt: "1 day ago",
      foodImage: "/assets/images/idly_batter.jpeg"
    },
    {
      id: 4,
      title: "Chaat Assembly Expert Needed",
      vendor: "Delhi Chaat House",
      vendorPhone: "+91 98765 43213",
      vendorRating: 4.7,
      vendorLocation: "Dadar Station West",
      gigType: "prep",
      skills: ["Chaat Assembly", "Garnish Work", "Speed Service"],
      description: "Need an expert in chaat assembly for festival rush. Must be fast and maintain quality standards.",
      date: "Saturday",
      time: "6:00 PM - 11:00 PM",
      duration: "5 hours",
      rate: 200,
      totalPay: 1000,
      urgency: "high",
      distance: "150m away",
      applicants: 7,
      status: "open",
      postedAt: "3 hours ago",
      foodImage: "/assets/images/rekha_chaat.jpeg"
    },
    {
      id: 5,
      title: "Chinese Wok Master for Peak Hours",
      vendor: "Spice Garden",
      vendorPhone: "+91 98765 43214",
      vendorRating: 4.5,
      vendorLocation: "Bandra Market",
      gigType: "emergency",
      skills: ["Wok Cooking", "Chinese Cuisine", "High Heat Cooking"],
      description: "Need a wok master for evening rush. Must know Chinese cooking techniques and handle high heat.",
      date: "Today",
      time: "7:00 PM - 10:00 PM",
      duration: "3 hours",
      rate: 300,
      totalPay: 900,
      urgency: "high",
      distance: "400m away",
      applicants: 2,
      status: "open",
      postedAt: "1 hour ago",
      foodImage: "/assets/images/schezwan_chutney.jpeg"
    }
  ]);

  const [availableKarigars, setAvailableKarigars] = useState([
    {
      id: 1,
      name: "Amit Kumar",
      age: 28,
      location: "Dadar Station West",
      rating: 4.9,
      totalGigs: 47,
      skills: ["Dosa Making", "Tawa Handling", "Batter Prep"],
      verifiedSkills: ["Dosa Master"],
      hourlyRate: 400,
      availability: "Flexible",
      bio: "Expert dosa maker with 8 years experience. Trained under South Indian masters.",
      image: "/assets/images/amit_kumar.jpeg",
      skillImage: "/assets/images/idly_batter.jpeg",
      distance: "150m away",
      online: true
    },
    {
      id: 2,
      name: "Priya Sharma",
      age: 24,
      location: "Bandra Market",
      rating: 4.7,
      totalGigs: 32,
      skills: ["Vegetable Chopping", "Bulk Prep", "Kitchen Organization"],
      verifiedSkills: ["Speed Chopper"],
      hourlyRate: 150,
      availability: "Morning & Evening",
      bio: "Fast and efficient vegetable chopper. Can handle bulk prep for any cuisine.",
      image: "/assets/images/priya_sharma.jpeg",
      skillImage: "/assets/images/onions.jpeg",
      distance: "300m away",
      online: true
    },
    {
      id: 3,
      name: "Rajesh Patel",
      age: 35,
      location: "Andheri Station",
      rating: 4.8,
      totalGigs: 89,
      skills: ["Chinese Wok", "High Heat Cooking", "Stir Fry"],
      verifiedSkills: ["Wok Master"],
      hourlyRate: 350,
      availability: "Evening Only",
      bio: "Chinese cuisine specialist with 12 years experience. Expert in wok cooking.",
      image: "/assets/images/Rajesh_patel.jpeg",
      skillImage: "/assets/images/schezwan_chutney.jpeg",
      distance: "200m away",
      online: false
    },
    {
      id: 4,
      name: "Sunita Devi",
      age: 42,
      location: "Dadar Station West",
      rating: 4.6,
      totalGigs: 56,
      skills: ["Chaat Assembly", "Garnish Work", "Customer Service"],
      verifiedSkills: ["Chaat Expert"],
      hourlyRate: 180,
      availability: "Afternoon & Evening",
      bio: "Chaat specialist with perfect assembly skills. Known for beautiful garnishes.",
      image: "/assets/images/Sunita_devi.jpeg",
      skillImage: "/assets/images/rekha_chaat.jpeg",
      distance: "100m away",
      online: true
    },
    {
      id: 5,
      name: "Vikram Singh",
      age: 31,
      location: "Bandra Market",
      rating: 4.9,
      totalGigs: 73,
      skills: ["Juice Making", "Cash Handling", "Equipment Operation"],
      verifiedSkills: ["Juice Master"],
      hourlyRate: 200,
      availability: "All Day",
      bio: "Juice stall expert with equipment knowledge. Great with customers and cash.",
      image: "/assets/images/Vikram_singh.jpeg",
      skillImage: "/assets/images/orange.jpeg",
      distance: "250m away",
      online: true
    }
  ]);

  const handleKarigarSubmit = (formData) => {
    const newKarigar = {
      id: Date.now(),
      ...formData,
      totalGigs: 0,
      rating: 5.0,
      online: true
    };
    setAvailableKarigars(prev => [newKarigar, ...prev]);
    setShowKarigarModal(false);
  };

  const handleGigSubmit = (formData) => {
    const newGig = {
      id: Date.now(),
      ...formData,
      applicants: 0,
      status: "open",
      postedAt: "Just now"
    };
    setAvailableGigs(prev => [newGig, ...prev]);
    setShowGigModal(false);
  };

  const handleApplyForGig = (gig) => {
    const application = {
      id: Date.now(),
      gigId: gig.id,
      gigTitle: gig.title,
      vendor: gig.vendor,
      appliedAt: new Date().toLocaleString(),
      status: 'pending',
      totalPay: gig.totalPay,
      date: gig.date,
      time: gig.time
    };

    setApplications(prev => [application, ...prev]);
    setAvailableGigs(prev =>
      prev.map(g => g.id === gig.id ? { ...g, applicants: g.applicants + 1 } : g)
    );
    setShowApplicationSuccess(true);
    setTimeout(() => setShowApplicationSuccess(false), 3000);
  };

  const handleSendMessage = (karigar, message) => {
    const newMessage = {
      id: Date.now(),
      karigarId: karigar.id,
      karigarName: karigar.name,
      message: message,
      sentAt: new Date().toLocaleString(),
      status: 'sent'
    };
    setMessages(prev => [newMessage, ...prev]);
    setShowMessageModal(false);
  };

  const filteredGigs = availableGigs.filter(gig => {
    const matchesSearch = gig.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      gig.vendor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      gig.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesFilter = filterType === 'all' || gig.gigType === filterType;
    return matchesSearch && matchesFilter;
  });

  const filteredKarigars = availableKarigars.filter(karigar => {
    return karigar.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      karigar.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
  });

  const urgencyConfig = {
    high: { color: 'bg-red-500', label: 'Urgent', textColor: 'text-red-600', bgColor: 'bg-red-50 border-red-200' },
    medium: { color: 'bg-yellow-500', label: 'Medium', textColor: 'text-yellow-600', bgColor: 'bg-yellow-50 border-yellow-200' },
    low: { color: 'bg-green-500', label: 'Flexible', textColor: 'text-green-600', bgColor: 'bg-green-50 border-green-200' }
  };

  const gigTypeConfig = {
    emergency: { label: 'Emergency', bg: 'bg-red-600', icon: 'Zap' },
    prep: { label: 'Prep Help', bg: 'bg-blue-600', icon: 'Scissors' },
    training: { label: 'Training', bg: 'bg-purple-600', icon: 'BookOpen' }
  };

  const tabs = [
    { id: 'gigs', label: 'Gigs', icon: 'Briefcase', count: availableGigs.length },
    { id: 'karigars', label: 'Karigars', icon: 'Users', count: availableKarigars.length },
    { id: 'applications', label: 'Applied', icon: 'ClipboardList', count: applications.length, badge: applications.length > 0 },
    { id: 'messages', label: 'Messages', icon: 'MessageSquare', count: messages.length, badge: messages.length > 0 }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Karigar Connect - Artisan Connect | Apna Mandi</title>
        <meta name="description" content="On-demand skilled kitchen help for street vendors." />
      </Helmet>

      <Header />

      {/* Page Header */}
      <div className="bg-card border-b border-border sticky top-0 z-40">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link to="/home" className="flex items-center space-x-1.5 text-primary hover:text-primary/80 transition-colors">
                <Icon name="Home" size={18} />
                <span className="font-medium text-sm">Home</span>
              </Link>
              <div className="h-5 w-px bg-border" />
              <div className="flex items-center space-x-2">
                <span className="text-xl">🔧</span>
                <div>
                  <h1 className="text-lg font-bold text-card-foreground leading-tight">Karigar Connect</h1>
                  <p className="text-xs text-muted-foreground">Artisan Connect</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1.5 bg-muted rounded-lg px-2.5 py-1.5">
                <Icon name="ShoppingCart" size={15} className="text-muted-foreground" />
                <span className="text-sm font-medium text-card-foreground">{cartCount}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Hero Banner */}
        <div className="relative bg-gradient-to-br from-orange-600 via-orange-500 to-red-500 rounded-2xl p-6 md:p-8 mb-6 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white transform translate-x-20 -translate-y-20" />
            <div className="absolute bottom-0 left-1/2 w-48 h-48 rounded-full bg-white transform -translate-x-1/2 translate-y-20" />
          </div>
          <div className="relative max-w-2xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Kitchen Help, On Demand</h2>
            <p className="text-sm md:text-base opacity-90 mb-5">
              Connect with verified karigars for emergency cover, prep assistance, and skill training — right in your area.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setShowKarigarModal(true)}
                className="flex items-center space-x-2 bg-white text-orange-600 hover:bg-orange-50 font-semibold px-4 py-2 rounded-xl transition-colors text-sm"
              >
                <Icon name="UserPlus" size={16} />
                <span>Join as Karigar</span>
              </button>
              <button
                onClick={() => setShowGigModal(true)}
                className="flex items-center space-x-2 border-2 border-white/70 text-white hover:bg-white/10 font-semibold px-4 py-2 rounded-xl transition-colors text-sm"
              >
                <Icon name="Briefcase" size={16} />
                <span>Post a Gig</span>
              </button>
            </div>
          </div>
        </div>

        {/* Search + Filter Row */}
        <div className="bg-card rounded-xl border border-border p-3 mb-5 flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search gigs, skills, or karigars..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-muted/50 border border-border rounded-lg text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
            />
          </div>
          <div className="w-full sm:w-44">
            <Select
              value={filterType}
              onChange={setFilterType}
              options={[
                { value: 'all', label: 'All Types' },
                { value: 'emergency', label: 'Emergency Cover' },
                { value: 'prep', label: 'Prep Help' },
                { value: 'training', label: 'Skill Training' }
              ]}
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-card rounded-xl border border-border mb-6 overflow-hidden">
          <div className="flex">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 px-2 py-3 text-xs sm:text-sm font-medium transition-colors border-b-2 ${
                  activeTab === tab.id
                    ? 'border-primary text-primary bg-primary/5'
                    : 'border-transparent text-muted-foreground hover:text-card-foreground hover:bg-muted/50'
                }`}
              >
                <div className="relative">
                  <Icon name={tab.icon} size={16} />
                  {tab.badge && (
                    <span className="absolute -top-1.5 -right-1.5 w-2 h-2 bg-orange-500 rounded-full" />
                  )}
                </div>
                <span className="hidden xs:inline">{tab.label}</span>
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                  activeTab === tab.id
                    ? 'bg-primary/20 text-primary'
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* ── Gigs Tab ── */}
        {activeTab === 'gigs' && (
          <>
            {filteredGigs.length === 0 ? (
              <EmptyState
                icon="Briefcase"
                title="No gigs found"
                description="Try adjusting your search or filters"
                action={{ label: "Post a Gig", onClick: () => setShowGigModal(true), icon: "Plus" }}
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredGigs.map((gig) => {
                  const urg = urgencyConfig[gig.urgency] || urgencyConfig.low;
                  const typeConf = gigTypeConfig[gig.gigType] || gigTypeConfig.prep;
                  return (
                    <div key={gig.id} className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all duration-200 flex flex-col">
                      {/* Image */}
                      <div className="relative h-44 bg-muted flex-shrink-0">
                        <img src={gig.foodImage} alt={gig.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute top-3 left-3">
                          <span className={`${typeConf.bg} text-white px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1`}>
                            <Icon name={typeConf.icon} size={11} />
                            {typeConf.label}
                          </span>
                        </div>
                        <div className="absolute top-3 right-3">
                          <span className={`${urg.color} px-2 py-0.5 rounded-full text-xs font-medium text-white flex items-center gap-1`}>
                            <span className="w-1.5 h-1.5 rounded-full bg-white/80 inline-block" />
                            {urg.label}
                          </span>
                        </div>
                        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                          <div className="flex items-center space-x-1.5">
                            <div className="w-5 h-5 bg-white/20 backdrop-blur rounded-full flex items-center justify-center">
                              <Icon name="Store" size={11} />
                            </div>
                            <span className="text-sm font-medium truncate max-w-[120px]">{gig.vendor}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Icon name="Star" size={12} className="text-yellow-400 fill-current" />
                            <span className="text-sm">{gig.vendorRating}</span>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 flex flex-col flex-1">
                        <div className="mb-3">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h3 className="font-semibold text-card-foreground text-sm leading-tight">{gig.title}</h3>
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-2">{gig.description}</p>
                        </div>

                        {/* Skills */}
                        <div className="flex flex-wrap gap-1 mb-3">
                          {gig.skills.map((skill, i) => (
                            <span key={i} className="bg-orange-50 text-orange-700 border border-orange-200 px-2 py-0.5 rounded-md text-xs">
                              {skill}
                            </span>
                          ))}
                        </div>

                        {/* Details grid */}
                        <div className="bg-muted/50 rounded-lg p-3 mb-3 grid grid-cols-2 gap-y-1.5 text-xs">
                          <span className="text-muted-foreground">Date</span>
                          <span className="font-medium text-card-foreground text-right">{gig.date}</span>
                          <span className="text-muted-foreground">Time</span>
                          <span className="font-medium text-card-foreground text-right">{gig.time}</span>
                          <span className="text-muted-foreground">Duration</span>
                          <span className="font-medium text-card-foreground text-right">{gig.duration}</span>
                          <span className="text-muted-foreground">Rate</span>
                          <span className="font-bold text-orange-600 text-right">₹{gig.rate}/hr</span>
                        </div>

                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <div className="text-lg font-bold text-green-600">₹{gig.totalPay}</div>
                            <div className="text-xs text-muted-foreground">Total Pay</div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center justify-end space-x-1 text-muted-foreground">
                              <Icon name="Users" size={13} />
                              <span className="text-sm font-medium text-card-foreground">{gig.applicants}</span>
                            </div>
                            <div className="text-xs text-muted-foreground">Applicants</div>
                          </div>
                        </div>

                        <div className="flex space-x-2 mt-auto">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => { setSelectedGig(gig); setShowDetailsModal(true); }}
                            className="flex-1"
                          >
                            <Icon name="Eye" size={14} className="mr-1" />
                            Details
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleApplyForGig(gig)}
                            className="flex-1 bg-orange-600 hover:bg-orange-700"
                          >
                            <Icon name="Check" size={14} className="mr-1" />
                            Apply
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}

        {/* ── Karigars Tab ── */}
        {activeTab === 'karigars' && (
          <>
            {filteredKarigars.length === 0 ? (
              <EmptyState
                icon="Users"
                title="No karigars found"
                description="Try adjusting your search"
                action={{ label: "Join as Karigar", onClick: () => setShowKarigarModal(true), icon: "UserPlus" }}
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredKarigars.map((karigar) => (
                  <div key={karigar.id} className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all duration-200 flex flex-col">
                    <div className="relative h-44 bg-muted flex-shrink-0">
                      <img src={karigar.image} alt={karigar.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute top-3 left-3">
                        <span className="bg-orange-600 text-white px-2.5 py-1 rounded-full text-xs font-semibold">KARIGAR</span>
                      </div>
                      <div className="absolute top-3 right-3 flex items-center space-x-1.5">
                        <span className={`text-xs font-medium text-white ${karigar.online ? 'opacity-100' : 'opacity-70'}`}>
                          {karigar.online ? 'Online' : 'Offline'}
                        </span>
                        <div className={`w-2.5 h-2.5 rounded-full border border-white ${karigar.online ? 'bg-green-400' : 'bg-gray-400'}`} />
                      </div>
                      <div className="absolute bottom-3 right-3 w-14 h-14 rounded-full border-2 border-white overflow-hidden shadow-lg">
                        <img src={karigar.skillImage} alt="Skill" className="w-full h-full object-cover" />
                      </div>
                    </div>

                    <div className="p-4 flex flex-col flex-1">
                      <div className="mb-2">
                        <h3 className="font-semibold text-card-foreground text-base">{karigar.name}</h3>
                        <p className="text-xs text-muted-foreground">{karigar.age} yrs • {karigar.location}</p>
                      </div>

                      <div className="flex items-center space-x-3 mb-3 text-xs text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Icon name="Star" size={12} className="text-yellow-500 fill-current" />
                          <span className="font-medium text-card-foreground">{karigar.rating}</span>
                        </div>
                        <span>•</span>
                        <span>{karigar.totalGigs} gigs</span>
                        <span>•</span>
                        <span>{karigar.distance}</span>
                      </div>

                      <div className="flex flex-wrap gap-1 mb-2">
                        {karigar.skills.slice(0, 3).map((skill, i) => (
                          <span key={i} className="bg-orange-50 text-orange-700 border border-orange-200 px-2 py-0.5 rounded-md text-xs">
                            {skill}
                          </span>
                        ))}
                        {karigar.skills.length > 3 && (
                          <span className="bg-muted text-muted-foreground px-2 py-0.5 rounded-md text-xs">
                            +{karigar.skills.length - 3}
                          </span>
                        )}
                      </div>

                      {karigar.verifiedSkills.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-3">
                          {karigar.verifiedSkills.map((skill, i) => (
                            <span key={i} className="bg-green-50 text-green-700 border border-green-200 px-2 py-0.5 rounded-md text-xs flex items-center gap-1">
                              <Icon name="BadgeCheck" size={11} />
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="bg-muted/50 rounded-lg p-2.5 mb-3 flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Rate</span>
                        <span className="font-bold text-orange-600">₹{karigar.hourlyRate}/hr</span>
                        <span className="text-muted-foreground">Avail.</span>
                        <span className="font-medium text-card-foreground">{karigar.availability}</span>
                      </div>

                      <div className="flex space-x-2 mt-auto">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => { setSelectedKarigar(karigar); setShowKarigarProfileModal(true); }}
                          className="flex-1"
                        >
                          <Icon name="Eye" size={14} className="mr-1" />
                          Profile
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => { setSelectedKarigar(karigar); setShowMessageModal(true); }}
                          className="flex-1 bg-orange-600 hover:bg-orange-700"
                        >
                          <Icon name="MessageSquare" size={14} className="mr-1" />
                          Message
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* ── Applications Tab ── */}
        {activeTab === 'applications' && (
          <div className="space-y-4">
            {applications.length === 0 ? (
              <EmptyState
                icon="ClipboardList"
                title="No applications yet"
                description="Browse available gigs and apply to get started"
                action={{ label: "Browse Gigs", onClick: () => setActiveTab('gigs'), icon: "Briefcase" }}
              />
            ) : (
              applications.map((app) => (
                <div key={app.id} className="bg-card rounded-xl border border-border p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-card-foreground">{app.gigTitle}</h4>
                      <p className="text-sm text-muted-foreground">{app.vendor}</p>
                    </div>
                    <div className="text-right flex-shrink-0 ml-3">
                      <div className="text-lg font-bold text-green-600">₹{app.totalPay}</div>
                      <div className="text-xs text-muted-foreground">{app.appliedAt}</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      {app.date} • {app.time}
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                      app.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                        app.status === 'accepted' ? 'bg-green-100 text-green-700' :
                          'bg-red-100 text-red-700'
                    }`}>
                      {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* ── Messages Tab ── */}
        {activeTab === 'messages' && (
          <div className="space-y-4">
            {messages.length === 0 ? (
              <EmptyState
                icon="MessageSquare"
                title="No messages yet"
                description="Browse karigars and send a message to connect"
                action={{ label: "Browse Karigars", onClick: () => setActiveTab('karigars'), icon: "Users" }}
              />
            ) : (
              messages.map((msg) => (
                <div key={msg.id} className="bg-card rounded-xl border border-border p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-9 h-9 bg-orange-100 rounded-full flex items-center justify-center">
                        <Icon name="User" size={16} className="text-orange-600" />
                      </div>
                      <div>
                        <p className="font-medium text-card-foreground">{msg.karigarName}</p>
                        <p className="text-xs text-muted-foreground">{msg.sentAt}</p>
                      </div>
                    </div>
                    <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full border border-blue-200">
                      {msg.status}
                    </span>
                  </div>
                  <p className="text-sm text-card-foreground bg-muted/50 rounded-lg p-3">{msg.message}</p>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Success Toast */}
      {showApplicationSuccess && (
        <div className="fixed top-4 right-4 bg-green-600 text-white px-5 py-3 rounded-xl shadow-xl z-50 flex items-center space-x-2 animate-bounce">
          <Icon name="CheckCircle" size={18} />
          <span className="font-medium">Application submitted!</span>
        </div>
      )}

      {/* Modals */}
      {showKarigarModal && (
        <KarigarModal onClose={() => setShowKarigarModal(false)} onSubmit={handleKarigarSubmit} />
      )}
      {showGigModal && (
        <GigModal onClose={() => setShowGigModal(false)} onSubmit={handleGigSubmit} />
      )}
      {showDetailsModal && selectedGig && (
        <DetailsModal gig={selectedGig} onClose={() => setShowDetailsModal(false)} onApply={handleApplyForGig} />
      )}
      {showKarigarProfileModal && selectedKarigar && (
        <KarigarProfileModal karigar={selectedKarigar} onClose={() => setShowKarigarProfileModal(false)} />
      )}
      {showMessageModal && selectedKarigar && (
        <MessageModal karigar={selectedKarigar} onClose={() => setShowMessageModal(false)} onSend={handleSendMessage} />
      )}
    </div>
  );
};

// ── Reusable Empty State ──
const EmptyState = ({ icon, title, description, action }) => (
  <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
    <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mb-4">
      <Icon name={icon} size={28} className="text-muted-foreground" />
    </div>
    <h3 className="text-lg font-semibold text-card-foreground mb-2">{title}</h3>
    <p className="text-muted-foreground text-sm mb-5 max-w-xs">{description}</p>
    {action && (
      <button
        onClick={action.onClick}
        className="flex items-center space-x-2 bg-primary text-primary-foreground hover:bg-primary/90 px-5 py-2.5 rounded-xl font-medium text-sm transition-colors"
      >
        <Icon name={action.icon} size={15} />
        <span>{action.label}</span>
      </button>
    )}
  </div>
);

// ── Modal Wrapper ──
const ModalWrap = ({ children, onClose, title, wide }) => (
  <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
    <div className={`bg-card rounded-2xl shadow-2xl w-full ${wide ? 'max-w-2xl' : 'max-w-md'} max-h-[90vh] overflow-y-auto`}>
      <div className="flex items-center justify-between px-6 py-4 border-b border-border sticky top-0 bg-card rounded-t-2xl z-10">
        <h2 className="text-lg font-bold text-card-foreground">{title}</h2>
        <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-muted transition-colors">
          <Icon name="X" size={18} className="text-muted-foreground" />
        </button>
      </div>
      {children}
    </div>
  </div>
);

// ── Karigar Registration Modal ──
const KarigarModal = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '', age: '', location: '', skills: '',
    verifiedSkills: '', hourlyRate: '', availability: 'Flexible', bio: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      skills: formData.skills.split(',').map(s => s.trim()),
      verifiedSkills: formData.verifiedSkills.split(',').map(s => s.trim()).filter(Boolean)
    });
  };

  return (
    <ModalWrap onClose={onClose} title="🔧 Join as Karigar">
      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-card-foreground mb-1.5">Full Name</label>
          <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Enter your full name" required />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-card-foreground mb-1.5">Age</label>
            <Input type="number" value={formData.age} onChange={(e) => setFormData({ ...formData, age: e.target.value })} placeholder="25" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-card-foreground mb-1.5">Location</label>
            <Input value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} placeholder="Dadar Station West" required />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-card-foreground mb-1.5">Skills (comma separated)</label>
          <Input value={formData.skills} onChange={(e) => setFormData({ ...formData, skills: e.target.value })} placeholder="Dosa Making, Vegetable Chopping" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-card-foreground mb-1.5">Verified Skills (optional)</label>
          <Input value={formData.verifiedSkills} onChange={(e) => setFormData({ ...formData, verifiedSkills: e.target.value })} placeholder="Dosa Master, Speed Chopper" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-card-foreground mb-1.5">Hourly Rate (₹)</label>
            <Input type="number" value={formData.hourlyRate} onChange={(e) => setFormData({ ...formData, hourlyRate: e.target.value })} placeholder="200" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-card-foreground mb-1.5">Availability</label>
            <Select
              value={formData.availability}
              onChange={(value) => setFormData({ ...formData, availability: value })}
              options={[
                { value: 'Flexible', label: 'Flexible' },
                { value: 'Morning Only', label: 'Morning Only' },
                { value: 'Evening Only', label: 'Evening Only' },
                { value: 'All Day', label: 'All Day' }
              ]}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-card-foreground mb-1.5">Bio</label>
          <textarea
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            placeholder="Tell us about your experience..."
            className="w-full p-3 border border-border rounded-lg bg-background text-card-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/30"
            rows={3}
            required
          />
        </div>
        <div className="flex space-x-3 pt-2">
          <Button type="button" variant="outline" onClick={onClose} className="flex-1">Cancel</Button>
          <Button type="submit" className="flex-1 bg-orange-600 hover:bg-orange-700">
            <Icon name="UserPlus" size={15} className="mr-2" />Join as Karigar
          </Button>
        </div>
      </form>
    </ModalWrap>
  );
};

// ── Post Gig Modal ──
const GigModal = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '', description: '', gigType: 'emergency',
    skills: '', date: 'Today', time: '', duration: '', rate: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      skills: formData.skills.split(',').map(s => s.trim()),
      vendor: "Your Stall",
      vendorPhone: "+91 98765 43217",
      vendorRating: 4.5,
      vendorLocation: "Your Location",
      urgency: formData.gigType === 'emergency' ? 'high' : 'medium',
      distance: "0m away",
      totalPay: parseInt(formData.rate || 0) * parseInt(formData.duration || 0),
      foodImage: "/assets/images/orange.jpeg"
    });
  };

  return (
    <ModalWrap onClose={onClose} title="📋 Post a Gig">
      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-card-foreground mb-1.5">Gig Title</label>
          <Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="e.g., Emergency Juice Stall Cover" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-card-foreground mb-1.5">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Describe what you need help with..."
            className="w-full p-3 border border-border rounded-lg bg-background text-card-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/30"
            rows={3}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-card-foreground mb-1.5">Gig Type</label>
          <Select value={formData.gigType} onChange={(v) => setFormData({ ...formData, gigType: v })}
            options={[
              { value: 'emergency', label: 'Emergency Cover' },
              { value: 'prep', label: 'Prep Help' },
              { value: 'training', label: 'Skill Training' }
            ]}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-card-foreground mb-1.5">Required Skills (comma separated)</label>
          <Input value={formData.skills} onChange={(e) => setFormData({ ...formData, skills: e.target.value })} placeholder="Juice Making, Cash Handling" required />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-card-foreground mb-1.5">Date</label>
            <Select value={formData.date} onChange={(v) => setFormData({ ...formData, date: v })}
              options={[
                { value: 'Today', label: 'Today' },
                { value: 'Tomorrow', label: 'Tomorrow' },
                { value: 'This Week', label: 'This Week' },
                { value: 'Next Week', label: 'Next Week' }
              ]}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-card-foreground mb-1.5">Time</label>
            <Input value={formData.time} onChange={(e) => setFormData({ ...formData, time: e.target.value })} placeholder="5:00 PM - 10:00 PM" required />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-card-foreground mb-1.5">Duration (hours)</label>
            <Input type="number" value={formData.duration} onChange={(e) => setFormData({ ...formData, duration: e.target.value })} placeholder="5" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-card-foreground mb-1.5">Rate (₹/hr)</label>
            <Input type="number" value={formData.rate} onChange={(e) => setFormData({ ...formData, rate: e.target.value })} placeholder="150" required />
          </div>
        </div>
        <div className="flex space-x-3 pt-2">
          <Button type="button" variant="outline" onClick={onClose} className="flex-1">Cancel</Button>
          <Button type="submit" className="flex-1 bg-orange-600 hover:bg-orange-700">
            <Icon name="Briefcase" size={15} className="mr-2" />Post Gig
          </Button>
        </div>
      </form>
    </ModalWrap>
  );
};

// ── Gig Details Modal ──
const DetailsModal = ({ gig, onClose, onApply }) => (
  <ModalWrap onClose={onClose} title={gig.title} wide>
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-semibold text-card-foreground mb-3">Gig Details</h3>
          <div className="space-y-3">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Description</p>
              <p className="text-sm text-card-foreground">{gig.description}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1.5">Required Skills</p>
              <div className="flex flex-wrap gap-1.5">
                {gig.skills.map((skill, i) => (
                  <span key={i} className="bg-orange-50 text-orange-700 border border-orange-200 px-2.5 py-1 rounded-md text-xs">{skill}</span>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div><p className="text-xs text-muted-foreground">Date</p><p className="font-medium">{gig.date}</p></div>
              <div><p className="text-xs text-muted-foreground">Time</p><p className="font-medium">{gig.time}</p></div>
              <div><p className="text-xs text-muted-foreground">Duration</p><p className="font-medium">{gig.duration}</p></div>
              <div><p className="text-xs text-muted-foreground">Rate</p><p className="font-bold text-orange-600">₹{gig.rate}/hr</p></div>
            </div>
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-card-foreground mb-3">Vendor Information</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-11 h-11 bg-orange-100 rounded-full flex items-center justify-center">
                <Icon name="Store" size={18} className="text-orange-600" />
              </div>
              <div>
                <p className="font-medium text-card-foreground">{gig.vendor}</p>
                <div className="flex items-center space-x-1">
                  <Icon name="Star" size={12} className="text-yellow-500 fill-current" />
                  <span className="text-xs text-muted-foreground">{gig.vendorRating}</span>
                </div>
              </div>
            </div>
            <div className="text-sm">
              <p className="text-xs text-muted-foreground">Location</p>
              <p className="font-medium">{gig.vendorLocation}</p>
            </div>
            <div className="text-sm">
              <p className="text-xs text-muted-foreground">Phone</p>
              <p className="font-medium">{gig.vendorPhone}</p>
            </div>
          </div>
          <div className="mt-5 bg-green-50 rounded-xl p-4 border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xl font-bold text-green-600">₹{gig.totalPay}</p>
                <p className="text-xs text-muted-foreground">Total Pay</p>
              </div>
              <Button onClick={() => { onApply(gig); onClose(); }} className="bg-green-600 hover:bg-green-700">
                <Icon name="Check" size={15} className="mr-2" />Apply Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </ModalWrap>
);

// ── Karigar Profile Modal ──
const KarigarProfileModal = ({ karigar, onClose }) => (
  <ModalWrap onClose={onClose} title={`👨‍🍳 ${karigar.name}'s Profile`} wide>
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative">
          <img src={karigar.image} alt={karigar.name} className="w-full h-56 object-cover rounded-xl" />
          <div className="absolute top-3 left-3">
            <span className="bg-orange-600 text-white px-3 py-1 rounded-full text-xs font-semibold">KARIGAR</span>
          </div>
          <div className="absolute top-3 right-3 flex items-center space-x-1.5">
            <span className="text-xs text-white font-medium">{karigar.online ? 'Online' : 'Offline'}</span>
            <div className={`w-2.5 h-2.5 rounded-full border border-white ${karigar.online ? 'bg-green-400' : 'bg-gray-400'}`} />
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-bold text-card-foreground">{karigar.name}</h3>
            <p className="text-muted-foreground text-sm">{karigar.age} yrs • {karigar.location}</p>
          </div>
          <div className="bg-muted rounded-xl p-3 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-1.5">
                <Icon name="Star" size={15} className="text-yellow-500 fill-current" />
                <span className="font-semibold">{karigar.rating}</span>
                <span className="text-muted-foreground">({karigar.totalGigs} gigs)</span>
              </div>
              <span className="text-muted-foreground text-xs">{karigar.distance}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Hourly Rate</span>
              <span className="font-bold text-orange-600 text-base">₹{karigar.hourlyRate}/hr</span>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-card-foreground text-sm mb-2">Skills</h4>
            <div className="flex flex-wrap gap-1.5">
              {karigar.skills.map((skill, i) => (
                <span key={i} className="bg-orange-50 text-orange-700 border border-orange-200 px-2.5 py-1 rounded-full text-xs">{skill}</span>
              ))}
            </div>
          </div>
          {karigar.verifiedSkills.length > 0 && (
            <div>
              <h4 className="font-semibold text-card-foreground text-sm mb-2">Verified Skills</h4>
              <div className="flex flex-wrap gap-1.5">
                {karigar.verifiedSkills.map((skill, i) => (
                  <span key={i} className="bg-green-50 text-green-700 border border-green-200 px-2.5 py-1 rounded-full text-xs flex items-center gap-1">
                    <Icon name="BadgeCheck" size={12} />{skill}
                  </span>
                ))}
              </div>
            </div>
          )}
          <div>
            <h4 className="font-semibold text-card-foreground text-sm mb-1">Availability</h4>
            <p className="text-sm text-muted-foreground">{karigar.availability}</p>
          </div>
          <div>
            <h4 className="font-semibold text-card-foreground text-sm mb-1">About</h4>
            <p className="text-sm text-muted-foreground">{karigar.bio}</p>
          </div>
        </div>
      </div>
      <div className="flex space-x-3 mt-6 pt-4 border-t border-border">
        <Button variant="outline" onClick={onClose} className="flex-1">Close</Button>
        <Button className="flex-1 bg-orange-600 hover:bg-orange-700">
          <Icon name="MessageSquare" size={15} className="mr-2" />Send Message
        </Button>
      </div>
    </div>
  </ModalWrap>
);

// ── Message Modal ──
const MessageModal = ({ karigar, onClose, onSend }) => {
  const [message, setMessage] = useState('');
  return (
    <ModalWrap onClose={onClose} title={`💬 Message ${karigar.name}`}>
      <div className="p-6">
        <label className="block text-sm font-medium text-card-foreground mb-2">Your Message</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Hi! I'm interested in your services..."
          className="w-full p-3 border border-border rounded-xl bg-background text-card-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/30 mb-4"
          rows={4}
        />
        <div className="flex space-x-3">
          <Button variant="outline" onClick={onClose} className="flex-1">Cancel</Button>
          <Button onClick={() => { if (message.trim()) onSend(karigar, message); }} disabled={!message.trim()} className="flex-1 bg-orange-600 hover:bg-orange-700">
            <Icon name="Send" size={15} className="mr-2" />Send Message
          </Button>
        </div>
      </div>
    </ModalWrap>
  );
};

export default KarigarConnect;