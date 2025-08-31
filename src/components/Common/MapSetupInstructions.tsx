import React from 'react'
import { MapPin, ExternalLink, Key, AlertTriangle } from 'lucide-react'

export function MapSetupInstructions() {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
      <div className="flex items-center space-x-3 mb-4">
        <div className="h-10 w-10 bg-blue-600 rounded-full flex items-center justify-center">
          <MapPin className="h-5 w-5 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-blue-900">Google Maps Setup Required</h3>
          <p className="text-blue-700 text-sm">Configure Google Maps API to enable interactive maps</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="bg-white rounded-lg p-4 border border-blue-200">
          <h4 className="font-semibold text-blue-900 mb-2 flex items-center space-x-2">
            <Key className="h-4 w-4" />
            <span>Step 1: Get Google Maps API Key</span>
          </h4>
          <ol className="text-sm text-blue-800 space-y-2 ml-6 list-decimal">
            <li>Go to the <a href="https://console.cloud.google.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline inline-flex items-center space-x-1">
              <span>Google Cloud Console</span>
              <ExternalLink className="h-3 w-3" />
            </a></li>
            <li>Create a new project or select an existing one</li>
            <li>Enable the "Maps JavaScript API" and "Places API"</li>
            <li>Create credentials (API Key) for your project</li>
            <li>Restrict the API key to your domain for security</li>
          </ol>
        </div>

        <div className="bg-white rounded-lg p-4 border border-blue-200">
          <h4 className="font-semibold text-blue-900 mb-2">Step 2: Configure API Key</h4>
          <p className="text-sm text-blue-800 mb-2">
            Replace <code className="bg-blue-100 px-2 py-1 rounded text-xs">YOUR_GOOGLE_MAPS_API_KEY</code> in the HTML file with your actual API key:
          </p>
          <div className="bg-gray-100 rounded p-3 text-xs font-mono text-gray-800 overflow-x-auto">
            &lt;script src="https://maps.googleapis.com/maps/api/js?key=<span className="text-red-600">YOUR_API_KEY_HERE</span>&libraries=places,geometry"&gt;&lt;/script&gt;
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
            <h4 className="font-semibold text-yellow-900">Important Security Note</h4>
          </div>
          <p className="text-sm text-yellow-800">
            Always restrict your Google Maps API key to specific domains and enable only the APIs you need. 
            This prevents unauthorized usage and protects your billing account.
          </p>
        </div>

        <div className="text-center">
          <a
            href="https://developers.google.com/maps/documentation/javascript/get-api-key"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-all duration-200"
          >
            <span>View Google Maps API Documentation</span>
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  )
}