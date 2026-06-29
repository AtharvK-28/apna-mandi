import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Header from '../../components/ui/Header';

const Home = () => {
  const stats = [
    { label: 'Active Gigs', value: '24', icon: 'Briefcase', color: 'text-orange-600', bg: 'bg-orange-100' },
    { label: 'Karigars Online', value: '18', icon: 'Users', color: 'text-green-600', bg: 'bg-green-100' },
    { label: 'Gigs Completed', value: '156', icon: 'CheckCircle', color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: 'Avg. Response', value: '8 min', icon: 'Clock', color: 'text-purple-600', bg: 'bg-purple-100' },
  ];

  const recentGigs = [
    { id: 1, title: 'Emergency Juice Stall Cover', vendor: 'Rajesh Juice Corner', pay: 750, urgency: 'Urgent', time: '2h ago', location: 'Dadar' },
    { id: 2, title: 'Bulk Vegetable Chopping', vendor: 'Mumbai Chinese Corner', pay: 240, urgency: 'Medium', time: '4h ago', location: 'Bandra' },
    { id: 3, title: 'Chinese Wok Master', vendor: 'Spice Garden', pay: 900, urgency: 'Urgent', time: '1h ago', location: 'Bandra' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Apna Mandi - Kitchen Help, On Demand</title>
        <meta name="description" content="India's first on-demand kitchen help marketplace for street food vendors." />
      </Helmet>

      <Header />

      <div className="container mx-auto px-4 py-6 max-w-5xl">

        {/* Hero — Karigar Connect */}
        <div className="relative bg-gradient-to-br from-orange-600 via-orange-500 to-red-500 rounded-2xl p-6 md:p-10 mb-8 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-white transform translate-x-20 -translate-y-20" />
            <div className="absolute bottom-0 left-1/3 w-56 h-56 rounded-full bg-white transform -translate-x-1/2 translate-y-20" />
          </div>
          <div className="relative max-w-2xl">
            <p className="text-orange-200 text-xs font-semibold uppercase tracking-widest mb-1">Phase 1 — Live Now</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Karigar Connect</h2>
            <p className="text-base md:text-lg opacity-90 mb-6 leading-relaxed">
              On-demand kitchen help for street food vendors. Post a gig when you need cover, or find work as a skilled karigar — all within walking distance.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/karigar-connect"
                className="flex items-center space-x-2 bg-white text-orange-600 hover:bg-orange-50 font-semibold px-5 py-2.5 rounded-xl transition-colors text-sm shadow-lg"
              >
                <Icon name="Briefcase" size={16} />
                <span>Find or Post Gigs</span>
              </Link>
              <Link
                to="/karigar-connect"
                className="flex items-center space-x-2 border-2 border-white/70 text-white hover:bg-white/10 font-semibold px-5 py-2.5 rounded-xl transition-colors text-sm"
              >
                <Icon name="UserPlus" size={16} />
                <span>Join as Karigar</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {stats.map(stat => (
            <div key={stat.label} className="bg-card border border-border rounded-xl p-4">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 ${stat.bg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <Icon name={stat.icon} size={18} className={stat.color} />
                </div>
                <div>
                  <div className="text-xl font-bold text-card-foreground">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Gigs Preview */}
        <div className="bg-card border border-border rounded-xl mb-8 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <div>
              <h3 className="font-semibold text-card-foreground">Recent Gigs Near You</h3>
              <p className="text-xs text-muted-foreground">Dadar & Bandra area</p>
            </div>
            <Link to="/karigar-connect" className="text-sm text-primary hover:text-primary/80 font-medium flex items-center space-x-1">
              <span>View All</span>
              <Icon name="ArrowRight" size={14} />
            </Link>
          </div>
          <div className="divide-y divide-border">
            {recentGigs.map(gig => (
              <Link key={gig.id} to="/karigar-connect" className="flex items-center justify-between px-5 py-3.5 hover:bg-muted/50 transition-colors">
                <div className="flex items-center space-x-3 min-w-0">
                  <div className="w-9 h-9 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="Briefcase" size={16} className="text-orange-600" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-card-foreground truncate">{gig.title}</p>
                    <p className="text-xs text-muted-foreground">{gig.vendor} &middot; {gig.location} &middot; {gig.time}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 flex-shrink-0 ml-3">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                    gig.urgency === 'Urgent' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>{gig.urgency}</span>
                  <span className="text-sm font-bold text-green-600">₹{gig.pay}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Phase 2 & 3 Teasers */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-card-foreground mb-4">Coming Soon</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Vendor Exchange Teaser */}
            <div className="bg-card border border-border rounded-xl p-5 relative overflow-hidden">
              <div className="absolute top-3 right-3">
                <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-0.5 rounded-full">Phase 2</span>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon name="RefreshCw" size={22} className="text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-card-foreground mb-1">Vendor Exchange</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Reduce waste and save money by exchanging surplus ingredients with nearby vendors. Post surplus, find what you need, or propose trades.
                  </p>
                  <Link
                    to="/vendor-exchange"
                    className="inline-flex items-center space-x-1 text-sm text-green-600 hover:text-green-700 font-medium"
                  >
                    <span>Preview</span>
                    <Icon name="ArrowRight" size={14} />
                  </Link>
                </div>
              </div>
            </div>

            {/* Virasaat Teaser */}
            <div className="bg-card border border-border rounded-xl p-5 relative overflow-hidden">
              <div className="absolute top-3 right-3">
                <span className="bg-purple-100 text-purple-700 text-xs font-semibold px-2 py-0.5 rounded-full">Phase 3</span>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon name="Crown" size={22} className="text-purple-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-card-foreground mb-1">Virasaat</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    License legendary street food recipes from master vendors. Turn your signature taste into a living legacy and earn royalties.
                  </p>
                  <Link
                    to="/virasaat"
                    className="inline-flex items-center space-x-1 text-sm text-purple-600 hover:text-purple-700 font-medium"
                  >
                    <span>Preview</span>
                    <Icon name="ArrowRight" size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* How Karigar Connect Works */}
        <div className="bg-card border border-border rounded-xl p-6 mb-8">
          <h3 className="font-bold text-card-foreground mb-5 text-center">How Karigar Connect Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { step: '1', icon: 'FileText', title: 'Post a Gig', desc: 'Vendor posts a gig — emergency cover, prep help, or skill training. Set your rate and timing.' },
              { step: '2', icon: 'Search', title: 'Match with Karigars', desc: 'Skilled karigars within 2-3 km see your gig and apply. Review profiles, ratings, and verified skills.' },
              { step: '3', icon: 'Handshake', title: 'Get It Done', desc: 'Accept an applicant, get the work done, and pay securely. Rate each other to build trust.' },
            ].map(item => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Icon name={item.icon} size={20} className="text-orange-600" />
                </div>
                <h4 className="font-semibold text-card-foreground mb-1">{item.title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
