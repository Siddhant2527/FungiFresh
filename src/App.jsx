import React, { useState, useEffect } from 'react';
import { 
  ShoppingBasket, 
  User, 
  Menu, 
  X, 
  Trash2, 
  Plus, 
  ShieldCheck, 
  Brain, 
  Zap,
  Phone,
  Mail,
  Instagram,
  Facebook,
  MessageCircle,
  Package,
  Settings,
  ChevronRight,
  LogOut,
  MapPin,
  CreditCard,
  CheckCircle2,
  Bell
} from 'lucide-react';

const PRODUCTS = [
  { id: 1, name: "Button Mushroom", price: 180, img: "https://green-goblin.in/cdn/shop/products/Webp.net-resizeimage_20_1400x_650aed55-45d0-44bf-b8f2-c5ca6119ae66.jpg?v=1617090335", desc: "Fresh organic clusters. Great for focus and brain health." },
  { id: 2, name: "Oyster Mushrooms", price: 120, img: "https://media.istockphoto.com/id/503491608/photo/oyster-mushroom.jpg?s=612x612&w=0&k=20&c=crzrtZ94HU9qRyjWcrLM6EFgb_5Jix74dnZzJRHm5A4=", desc: "Delicate and savory. Perfect for stir-fries and pasta." },
  { id: 3, name: "Shiitake", price: 150, img: "https://5.imimg.com/data5/WK/YY/KF/SELLER-14805738/shiitake-mushroom-500x500.jpg", desc: "Meaty texture with deep umami flavor. Rich in vitamins." },
  { id: 4, name: "King Trumpet", price: 140, img: "https://rrcultivation.com/cdn/shop/files/King_Trumpet_Product_Photo_grande.jpg?v=1736968967", desc: "Excellent meat substitute. Firm texture and nutty taste." },
  { id: 5, name: "Dry Mushroom", price: 250, img: "https://t3.ftcdn.net/jpg/16/76/37/10/360_F_1676371062_wkLzGDXEi5x9VXzk4QImlnEPRhlVnqKd.jpg", desc: "Triple extracted tincture for daily immunity support." },
  { id: 6, name: "Grow Kit", price: 320, img: "https://www.thefunguy.com.au/cdn/shop/files/Untitleddesign_13.png?v=1724653270", desc: "Grow your own mushrooms at home in just 2 weeks." }
];

const MOCK_ORDERS = [
  { id: "FF-9021", date: "Oct 12, 2023", status: "Delivered", total: 450, items: ["Button Mushroom x2", "Shiitake x1"] },
  { id: "FF-8842", date: "Nov 05, 2023", status: "Processing", total: 320, items: ["Grow Kit x1"] },
];

export default function App() {
  // State
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [currentView, setCurrentView] = useState('home');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  
  // Notification State
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  // Derived State
  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);

  // Auto-hide toast
  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        setToast({ ...toast, show: false });
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toast.show]);

  // Actions
  const showNotification = (message, type = "success") => {
    setToast({ show: true, message, type });
  };

  const addToCart = (product) => {
    setCart([...cart, { ...product, cartId: Math.random() }]);
    showNotification(`${product.name} added to your basket!`);
  };

  const removeFromCart = (cartId) => {
    setCart(cart.filter(item => item.cartId !== cartId));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!emailInput) return;
    const name = emailInput.split('@')[0];
    setUser({ 
      email: emailInput, 
      name: name.charAt(0).toUpperCase() + name.slice(1),
      phone: "+91 98765 43210",
      address: "42, Green Avenue, Mumbai, MH"
    });
    setIsLoginModalOpen(false);
    setEmailInput("");
    showNotification(`Welcome back to FungiFresh, ${name}! Happy mushroom hunting. ✨`);
  };

  const handleLogout = () => {
    setUser(null);
    setIsUserDropdownOpen(false);
    setCurrentView('home');
    showNotification("You have been signed out successfully.", "info");
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    showNotification("Thank you! Our farm team will contact you shortly.", "success");
    e.target.reset();
  };

  const navigateTo = (view) => {
    setCurrentView(view);
    setIsUserDropdownOpen(false);
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  // Sub-components
  const ToastNotification = () => (
    <div className={`fixed top-6 left-1/2 -translate-x-1/2 z-[200] transition-all duration-500 transform ${toast.show ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0 pointer-events-none'}`}>
      <div className={`flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl border ${toast.type === 'success' ? 'bg-white border-emerald-100' : 'bg-white border-blue-100'}`}>
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${toast.type === 'success' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'}`}>
          {toast.type === 'success' ? <CheckCircle2 size={20} /> : <Bell size={20} />}
        </div>
        <div className="pr-4">
          <p className="text-sm font-bold text-stone-900">{toast.message}</p>
        </div>
        <button onClick={() => setToast({ ...toast, show: false })} className="text-stone-300 hover:text-stone-500">
          <X size={18} />
        </button>
      </div>
    </div>
  );

  const OrdersView = () => (
    <div className="max-w-4xl mx-auto pt-32 pb-24 px-4 min-h-screen">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => setCurrentView('home')} className="p-2 hover:bg-stone-200 rounded-full transition">
          <ChevronRight size={24} className="rotate-180" />
        </button>
        <h1 className="text-4xl font-serif">My Orders</h1>
      </div>
      <div className="space-y-6">
        {MOCK_ORDERS.map(order => (
          <div key={order.id} className="bg-white p-6 md:p-8 rounded-[2rem] border border-stone-100 shadow-sm flex flex-col md:flex-row justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">{order.status}</span>
                <span className="text-stone-400 text-sm font-medium">Order #{order.id}</span>
              </div>
              <h3 className="text-xl font-bold">{order.date}</h3>
              <p className="text-stone-500">{order.items.join(', ')}</p>
            </div>
            <div className="flex flex-col md:items-end justify-center gap-4">
              <span className="text-2xl font-serif font-bold">₹{order.total}</span>
              <button className="text-emerald-700 font-bold hover:underline">Track Package</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const SettingsView = () => (
    <div className="max-w-4xl mx-auto pt-32 pb-24 px-4 min-h-screen">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => setCurrentView('home')} className="p-2 hover:bg-stone-200 rounded-full transition">
          <ChevronRight size={24} className="rotate-180" />
        </button>
        <h1 className="text-4xl font-serif">Profile Settings</h1>
      </div>
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="space-y-2">
          <button className="w-full flex items-center gap-3 px-6 py-4 rounded-2xl bg-emerald-700 text-white font-bold shadow-lg shadow-emerald-700/20">
            <User size={20} /> Account Details
          </button>
          <button className="w-full flex items-center gap-3 px-6 py-4 rounded-2xl text-stone-600 hover:bg-white font-medium transition">
            <MapPin size={20} /> Shipping Addresses
          </button>
          <button className="w-full flex items-center gap-3 px-6 py-4 rounded-2xl text-stone-600 hover:bg-white font-medium transition">
            <CreditCard size={20} /> Payment Methods
          </button>
          <hr className="my-4 border-stone-200" />
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-6 py-4 rounded-2xl text-red-600 hover:bg-red-50 font-medium transition">
            <LogOut size={20} /> Delete Account
          </button>
        </div>
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-8 rounded-[2.5rem] border border-stone-100 shadow-sm">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><Settings size={20} className="text-emerald-700" /> Basic Information</h2>
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-400 uppercase tracking-wider ml-1">Full Name</label>
                  <input type="text" defaultValue={user?.name} className="w-full px-6 py-3 rounded-xl bg-stone-50 border border-stone-200 outline-none focus:ring-2 focus:ring-emerald-500" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-400 uppercase tracking-wider ml-1">Phone Number</label>
                  <input type="text" defaultValue={user?.phone} className="w-full px-6 py-3 rounded-xl bg-stone-50 border border-stone-200 outline-none focus:ring-2 focus:ring-emerald-500" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-400 uppercase tracking-wider ml-1">Email Address</label>
                <input type="email" readOnly defaultValue={user?.email} className="w-full px-6 py-3 rounded-xl bg-stone-100 border border-stone-200 text-stone-500 cursor-not-allowed" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-400 uppercase tracking-wider ml-1">Delivery Address</label>
                <textarea rows="3" defaultValue={user?.address} className="w-full px-6 py-3 rounded-xl bg-stone-50 border border-stone-200 outline-none focus:ring-2 focus:ring-emerald-500" />
              </div>
              <button 
                onClick={() => showNotification("Profile updated successfully!")}
                className="bg-stone-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-emerald-800 transition"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans selection:bg-emerald-100">
      
      <ToastNotification />

      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigateTo('home')}>
              <div className="w-10 h-10 bg-emerald-700 rounded-lg flex items-center justify-center text-white">
                <Plus size={24} className="rotate-45" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-stone-800">FungiFresh</span>
            </div>
            
            <div className="hidden md:flex space-x-8 font-medium">
              <a href="#home" onClick={() => navigateTo('home')} className="hover:text-emerald-700 transition">Home</a>
              <a href="#benefits" onClick={() => navigateTo('home')} className="hover:text-emerald-700 transition">Benefits</a>
              <a href="#shop" onClick={() => navigateTo('home')} className="hover:text-emerald-700 transition">Shop</a>
              <a href="#contact" onClick={() => navigateTo('home')} className="hover:text-emerald-700 transition">Contact</a>
            </div>

            <div className="flex items-center gap-4">
              <button onClick={() => setIsCartOpen(true)} className="relative p-2 hover:bg-stone-100 rounded-full transition">
                <ShoppingBasket size={24} />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center animate-bounce">
                    {cart.length}
                  </span>
                )}
              </button>

              <div className="relative">
                <button 
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className="flex items-center gap-2 p-1 pl-3 rounded-full border border-stone-200 hover:bg-stone-50 transition"
                >
                  <span className="hidden sm:inline text-sm font-semibold">{user ? user.name : 'Guest'}</span>
                  <div className="w-8 h-8 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center">
                    <User size={16} />
                  </div>
                </button>

                {isUserDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-stone-100 py-3 z-[70] animate-in fade-in slide-in-from-top-2">
                    {user ? (
                      <>
                        <div className="px-4 py-2 border-b mb-2">
                          <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Logged in as</p>
                          <p className="text-sm font-bold truncate">{user.email}</p>
                        </div>
                        <button onClick={() => navigateTo('orders')} className="w-full flex items-center gap-3 text-left px-4 py-2.5 text-sm hover:bg-stone-50 font-medium">
                          <Package size={16} className="text-stone-400" /> My Orders
                        </button>
                        <button onClick={() => navigateTo('settings')} className="w-full flex items-center gap-3 text-left px-4 py-2.5 text-sm hover:bg-stone-50 font-medium">
                          <Settings size={16} className="text-stone-400" /> Profile Settings
                        </button>
                        <hr className="my-2 border-stone-100" />
                        <button onClick={handleLogout} className="w-full flex items-center gap-3 text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 font-medium">
                          <LogOut size={16} /> Sign Out
                        </button>
                      </>
                    ) : (
                      <button 
                        onClick={() => { setIsLoginModalOpen(true); setIsUserDropdownOpen(false); }}
                        className="w-full text-left px-4 py-3 text-sm hover:bg-stone-50 font-bold text-emerald-700"
                      >
                        Login / Register
                      </button>
                    )}
                  </div>
                )}
              </div>

              <button className="md:hidden p-2 hover:bg-stone-100 rounded-full" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      {currentView === 'home' && (
        <>
          <section id="home" className="relative h-screen flex items-center justify-center text-center text-white pt-20 overflow-hidden">
            <div className="absolute inset-0 bg-black/40 z-10" />
            <img 
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=1920" 
              className="absolute inset-0 w-full h-full object-cover scale-105"
              alt="Hero background"
            />
            <div className="relative z-20 max-w-4xl px-4">
              <h1 className="text-6xl md:text-8xl mb-6 font-serif leading-tight tracking-tight">Nature's Purest Superfood</h1>
              <p className="text-xl md:text-2xl mb-10 text-stone-200 font-light">Organic clusters grown with care. From our farm to your kitchen.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="#shop" className="bg-emerald-700 hover:bg-emerald-800 text-white px-10 py-4 rounded-full text-lg font-semibold transition shadow-xl shadow-emerald-900/20">Order Now</a>
                <a href="#benefits" className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white text-white px-10 py-4 rounded-full text-lg font-semibold transition">Learn Benefits</a>
              </div>
            </div>
          </section>

          <section id="shop" className="py-24 bg-stone-100">
            <div className="max-w-7xl mx-auto px-4">
              <h2 className="text-4xl md:text-5xl font-serif mb-12 text-center">Our Harvest</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {PRODUCTS.map(product => (
                  <div key={product.id} className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all group">
                    <div className="relative aspect-square overflow-hidden">
                      <img src={product.img} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                      <div className="absolute top-4 right-4 bg-white/95 backdrop-blur px-4 py-1.5 rounded-full text-sm font-bold shadow-lg">
                        ₹{product.price}
                      </div>
                    </div>
                    <div className="p-8 text-center">
                      <h3 className="text-2xl mb-2 font-serif">{product.name}</h3>
                      <p className="text-stone-500 text-sm mb-8 leading-relaxed">{product.desc}</p>
                      <button 
                        onClick={() => addToCart(product)}
                        className="w-full bg-stone-50 hover:bg-emerald-700 hover:text-white text-stone-800 py-4 rounded-2xl font-bold transition flex items-center justify-center gap-2"
                      >
                        <Plus size={20} /> Add to Basket
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="contact" className="py-24 max-w-4xl mx-auto px-4">
            <div className="bg-white p-10 md:p-16 rounded-[3rem] shadow-2xl border border-stone-100 text-center">
              <h2 className="text-4xl font-serif mb-6">Contact Us</h2>
              <form className="space-y-6" onSubmit={handleContactSubmit}>
                <div className="grid md:grid-cols-2 gap-6">
                  <input type="text" placeholder="Name" className="w-full px-6 py-4 rounded-2xl border border-stone-200 outline-none focus:ring-2 focus:ring-emerald-500 transition" required />
                  <input type="email" placeholder="Email" className="w-full px-6 py-4 rounded-2xl border border-stone-200 outline-none focus:ring-2 focus:ring-emerald-500 transition" required />
                </div>
                <textarea rows="4" placeholder="How can we help?" className="w-full px-6 py-4 rounded-2xl border border-stone-200 outline-none focus:ring-2 focus:ring-emerald-500 transition" required />
                <button type="submit" className="w-full bg-stone-900 text-white py-5 rounded-2xl font-bold transition hover:bg-emerald-800 shadow-xl">Send Message</button>
              </form>
            </div>
          </section>
        </>
      )}

      {currentView === 'orders' && <OrdersView />}
      {currentView === 'settings' && <SettingsView />}

      {/* Footer */}
      <footer className="bg-stone-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-8">
            <Plus size={32} className="text-emerald-500 rotate-45" />
            <span className="text-3xl font-bold tracking-tight">FungiFresh</span>
          </div>
          <div className="flex justify-center gap-8 mb-12">
            <a 
              href="https://www.instagram.com/your_instagram_account" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-emerald-400 transition"
            >
              <Instagram />
            </a>
            <Facebook className="hover:text-emerald-400 cursor-pointer transition" />
            <MessageCircle className="hover:text-emerald-400 cursor-pointer transition" />
          </div>
          <p className="text-sm text-stone-600 border-t border-stone-800 pt-8">&copy; 2024 FungiFresh Mushroom Farm.</p>
        </div>
      </footer>

      {/* Cart Drawer */}
      {isCartOpen && (
        <>
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90]" onClick={() => setIsCartOpen(false)} />
          <div className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white z-[100] shadow-2xl animate-in slide-in-from-right duration-300 flex flex-col">
            <div className="p-8 border-b flex justify-between items-center">
              <h2 className="text-2xl font-serif">Your Basket</h2>
              <button onClick={() => setIsCartOpen(false)} className="text-stone-400 hover:text-black font-bold text-xl"><X size={24} /></button>
            </div>
            <div className="flex-grow overflow-y-auto p-8 space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-20 text-stone-400 italic">Basket is empty</div>
              ) : (
                cart.map((item) => (
                  <div key={item.cartId} className="flex gap-4 items-center bg-stone-50 p-4 rounded-2xl border border-stone-100">
                    <img src={item.img} className="w-16 h-16 rounded-xl object-cover" alt="" />
                    <div className="flex-grow text-sm">
                      <h4 className="font-bold">{item.name}</h4>
                      <p className="text-stone-500">₹{item.price}</p>
                    </div>
                    <button onClick={() => removeFromCart(item.cartId)} className="text-stone-300 hover:text-red-500"><Trash2 size={18} /></button>
                  </div>
                ))
              )}
            </div>
            <div className="p-8 border-t bg-white">
              <div className="flex justify-between items-end mb-8">
                <span className="text-stone-500 text-sm">Subtotal</span>
                <span className="text-3xl font-bold font-serif">₹{cartTotal}</span>
              </div>
              <button 
                onClick={() => { showNotification("Proceeding to checkout..."); setIsCartOpen(false); }}
                className="w-full bg-emerald-700 text-white py-5 rounded-[2rem] font-bold shadow-xl shadow-emerald-700/20"
              >
                Checkout Now
              </button>
            </div>
          </div>
        </>
      )}

      {/* Login Modal */}
      {isLoginModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={() => setIsLoginModalOpen(false)} />
          <div className="relative bg-white w-full max-w-md rounded-[3rem] p-10 shadow-2xl animate-in zoom-in-95">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-serif">Welcome</h2>
              <button onClick={() => setIsLoginModalOpen(false)} className="text-stone-400"><X size={24} /></button>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-stone-400 uppercase ml-2 tracking-widest">Email Address</label>
                <input 
                  type="email" 
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="name@example.com" 
                  className="w-full px-6 py-4 rounded-2xl border border-stone-200 outline-none focus:ring-2 focus:ring-emerald-500 transition bg-stone-50" required 
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-stone-400 uppercase ml-2 tracking-widest">Password</label>
                <input type="password" placeholder="••••••••" className="w-full px-6 py-4 rounded-2xl border border-stone-200 outline-none focus:ring-2 focus:ring-emerald-500 transition bg-stone-50" required />
              </div>
              <button type="submit" className="w-full bg-emerald-700 text-white py-5 rounded-2xl font-bold shadow-lg shadow-emerald-700/20 mt-4 transition hover:bg-emerald-800">Sign In</button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}