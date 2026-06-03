const AdminSettings = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8">
      <h3 className="text-xl font-bold text-primary mb-6 border-b pb-4">Portal Settings</h3>
      
      <div className="max-w-md space-y-6">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Admin Password</label>
          <input 
            type="password" 
            className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-accent outline-none"
            placeholder="Change admin password"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">WhatsApp Number</label>
          <input 
            type="text" 
            className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-accent outline-none"
            defaultValue="+263782490456"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Day Rest Rate ($)</label>
            <input 
              type="number" 
              className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-accent outline-none"
              defaultValue="25"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Night Stay Rate ($)</label>
            <input 
              type="number" 
              className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-accent outline-none"
              defaultValue="50"
            />
          </div>
        </div>

        <button className="bg-primary text-white font-bold py-3 px-8 rounded-sm shadow-lg hover:bg-opacity-90 transition-all">
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default AdminSettings;
