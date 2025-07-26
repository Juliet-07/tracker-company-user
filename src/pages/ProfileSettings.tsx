import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Camera } from "lucide-react";

const ProfileSettings = () => {
  return (
    <div className="flex-1 flex flex-col">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-semibold text-gray-800">
              Profile Settings
            </h1>
          </div>
        </div>
      </header>

      <main className="flex-1 p-6 overflow-auto bg-slate-200">
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">
              Profile Information
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Update your personal information and profile details
            </p>
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
                <h4 className="text-xl font-semibold text-gray-800">
                  Sarah Johnson
                </h4>
                <p className="text-gray-600">Fleet Manager</p>
                <p className="text-sm text-gray-500">
                  Member since January 2023
                </p>
              </div>
            </div>

            <form className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <Label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </Label>
                  <Input type="text" defaultValue="Sarah" />
                </div>
              </div>

              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </Label>
                <Input type="email" defaultValue="sarah.johnson@company.com" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </Label>
                  <Input type="tel" defaultValue="+1 (555) 123-4567" />
                </div>
                <div>
                  <Label className="block text-sm font-medium text-gray-700 mb-2">
                    Job Title
                  </Label>
                  <Input type="text" defaultValue="Fleet Manager" />
                </div>
              </div>

              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-2">
                  Organization
                </Label>
                <Input type="text" defaultValue="Transport Solutions Inc." />
              </div>

              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-2">
                  Bio
                </Label>
                <Textarea
                  rows={4}
                  placeholder="Tell us about yourself..."
                  defaultValue="Experienced fleet manager with over 8 years in logistics and vehicle tracking solutions."
                />
              </div>

              <div className="flex justify-end space-x-3">
                <Button type="button" variant="outline">
                  Cancel
                </Button>
                <Button type="submit">Save Changes</Button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfileSettings;
