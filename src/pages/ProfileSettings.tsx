
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { 
  User, 
  Shield, 
  Bell, 
  Settings,
  Camera,
  Key,
  Download,
  Trash,
  Eye
} from "lucide-react";

const ProfileSettings = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { id: "profile", label: "Profile" },
    { id: "account", label: "Account" },
    { id: "notifications", label: "Notifications" },
    { id: "security", label: "Security" },
    { id: "preferences", label: "Preferences" },
  ];

  return (
    <div className="flex-1 flex flex-col">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-semibold text-gray-800">Profile Settings</h1>
          </div>
        </div>
      </header>

      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-6xl mx-auto">
          {/* Settings Navigation */}
          <div className="bg-white rounded-lg shadow-sm mb-6">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? "border-primary text-primary"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Information */}
            <div className="lg:col-span-2">
              {activeTab === "profile" && (
                <>
                  <div className="bg-white rounded-lg shadow-sm">
                    <div className="p-6 border-b border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-800">Profile Information</h3>
                      <p className="text-sm text-gray-600 mt-1">Update your personal information and profile details</p>
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-center space-x-6 mb-8">
                        <div className="relative">
                          <img 
                            src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg" 
                            alt="Profile" 
                            className="w-24 h-24 rounded-full"
                          />
                          <button className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full shadow-lg hover:bg-blue-600">
                            <Camera className="h-4 w-4" />
                          </button>
                        </div>
                        <div>
                          <h4 className="text-xl font-semibold text-gray-800">Sarah Johnson</h4>
                          <p className="text-gray-600">Fleet Manager</p>
                          <p className="text-sm text-gray-500">Member since January 2023</p>
                        </div>
                      </div>

                      <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <Label className="block text-sm font-medium text-gray-700 mb-2">First Name</Label>
                            <Input type="text" defaultValue="Sarah" />
                          </div>
                          <div>
                            <Label className="block text-sm font-medium text-gray-700 mb-2">Last Name</Label>
                            <Input type="text" defaultValue="Johnson" />
                          </div>
                        </div>

                        <div>
                          <Label className="block text-sm font-medium text-gray-700 mb-2">Email Address</Label>
                          <Input type="email" defaultValue="sarah.johnson@company.com" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <Label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</Label>
                            <Input type="tel" defaultValue="+1 (555) 123-4567" />
                          </div>
                          <div>
                            <Label className="block text-sm font-medium text-gray-700 mb-2">Job Title</Label>
                            <Input type="text" defaultValue="Fleet Manager" />
                          </div>
                        </div>

                        <div>
                          <Label className="block text-sm font-medium text-gray-700 mb-2">Organization</Label>
                          <Input type="text" defaultValue="Transport Solutions Inc." />
                        </div>

                        <div>
                          <Label className="block text-sm font-medium text-gray-700 mb-2">Bio</Label>
                          <Textarea 
                            rows={4} 
                            placeholder="Tell us about yourself..." 
                            defaultValue="Experienced fleet manager with over 8 years in logistics and vehicle tracking solutions."
                          />
                        </div>

                        <div className="flex justify-end space-x-3">
                          <Button type="button" variant="outline">Cancel</Button>
                          <Button type="submit">Save Changes</Button>
                        </div>
                      </form>
                    </div>
                  </div>

                  {/* Account Settings */}
                  <div className="bg-white rounded-lg shadow-sm mt-6">
                    <div className="p-6 border-b border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-800">Account Settings</h3>
                      <p className="text-sm text-gray-600 mt-1">Manage your account preferences and security</p>
                    </div>
                    
                    <div className="p-6 space-y-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-sm font-medium text-gray-800">Two-Factor Authentication</h4>
                          <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-sm font-medium text-gray-800">Email Notifications</h4>
                          <p className="text-sm text-gray-600">Receive email alerts for important events</p>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-sm font-medium text-gray-800">SMS Alerts</h4>
                          <p className="text-sm text-gray-600">Get SMS notifications for critical alerts</p>
                        </div>
                        <Switch />
                      </div>
                    </div>
                  </div>
                </>
              )}

              {activeTab !== "profile" && (
                <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                  <p className="text-gray-500">Content for {tabs.find(t => t.id === activeTab)?.label} tab coming soon...</p>
                </div>
              )}
            </div>

            {/* Quick Actions Sidebar */}
            <div className="space-y-6">
              {/* Account Status */}
              <div className="bg-white rounded-lg shadow-sm">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Account Status</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Account Type</span>
                      <Badge className="bg-primary hover:bg-primary text-white">Premium</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Status</span>
                      <Badge className="bg-green-500 hover:bg-green-600 text-white">Active</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Last Login</span>
                      <span className="text-sm text-gray-800">2 hours ago</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Settings */}
              <div className="bg-white rounded-lg shadow-sm">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Settings</h3>
                  <div className="space-y-3">
                    <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg">
                      <Key className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-700">Change Password</span>
                    </button>
                    <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg">
                      <Download className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-700">Export Data</span>
                    </button>
                    <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg">
                      <Shield className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-700">Privacy Settings</span>
                    </button>
                    <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-red-50 rounded-lg text-red-600">
                      <Trash className="h-4 w-4 text-red-600" />
                      <span className="text-sm">Delete Account</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Activity Summary */}
              <div className="bg-white rounded-lg shadow-sm">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <div>
                        <p className="text-sm text-gray-800">Profile updated</p>
                        <p className="text-xs text-gray-500">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <div>
                        <p className="text-sm text-gray-800">Login successful</p>
                        <p className="text-xs text-gray-500">3 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                      <div>
                        <p className="text-sm text-gray-800">Password changed</p>
                        <p className="text-xs text-gray-500">1 day ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfileSettings;
