import ExpoModulesCore
import RoomPlan
import UIKit

// This view will be used as a native component. Make sure to inherit from `ExpoView`
// to apply the proper styling (e.g. border radius and shadows).
class ExpoRoomPlanView: ExpoView, RoomCaptureViewDelegate, RoomCaptureSessionDelegate {
    private var roomCaptureView: RoomCaptureView!
    private var roomCaptureSessionConfig: RoomCaptureSession.Configuration = RoomCaptureSession.Configuration()
    private var finalResults: CapturedRoom?
    private var isScanning: Bool = false
    
    let onScanComplete = EventDispatcher()
    
    required init(appContext: AppContext? = nil) {
        super.init(appContext: appContext)
        setupRoomCaptureView()
    }
    
    private func setupRoomCaptureView() {
        roomCaptureView = RoomCaptureView(frame: bounds)
        roomCaptureView.captureSession.delegate = self
        roomCaptureView.delegate = self
        
        addSubview(roomCaptureView)
    }
    
    override func layoutSubviews() {
        super.layoutSubviews()
        roomCaptureView.frame = bounds
    }
    
    // MARK: - Session Control
    
    func startSession() {
        isScanning = true
        roomCaptureView.captureSession.run(configuration: roomCaptureSessionConfig)
    }
    
    func stopSession() {
        isScanning = false
        roomCaptureView.captureSession.stop()
    }
    
    // MARK: - RoomCaptureViewDelegate
    
    func captureView(shouldPresent roomDataForProcessing: CapturedRoomData, error: Error?) -> Bool {
        return true
    }
    
    func captureView(didPresent processedResult: CapturedRoom, error: Error?) {
        finalResults = processedResult
        
        // Export results
        if let results = finalResults {
            do {
                let destinationFolderURL = FileManager.default.temporaryDirectory.appending(path: "Export")
                let destinationURL = destinationFolderURL.appending(path: "Room.usdz")
                try FileManager.default.createDirectory(at: destinationFolderURL, withIntermediateDirectories: true)
                try results.export(to: destinationURL, exportOptions: .parametric)
                
                // Send event to JavaScript
                onScanComplete([
                    "success": true,
                    "path": destinationURL.path()
                ])
            } catch {
                onScanComplete([
                    "success": false,
                    "error": error.localizedDescription
                ])
            }
        }
    }
}
