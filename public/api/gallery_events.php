<?php
require_once 'db.php';

$db = getDB();
$method = $_SERVER['REQUEST_METHOD'];

function saveBase64Image($img, $prefix = 'event_photo') {
    $imgData = $img;
    $originalName = '';

    if (is_array($img)) {
        $originalName = isset($img['name']) ? $img['name'] : (isset($img['original_name']) ? $img['original_name'] : '');
        $imgData = isset($img['url']) ? $img['url'] : (isset($img['image_url']) ? $img['image_url'] : '');
    }

    if (is_string($imgData) && strpos($imgData, 'data:image') === 0) {
        $parts = explode(',', $imgData);
        if (count($parts) === 2) {
            $data = base64_decode($parts[1]);
            if ($data !== false) {
                $mime = 'png';
                if (preg_match('/data:image\/(.*?);/', $parts[0], $matches)) {
                    $mime = $matches[1];
                }
                $ext = ($mime === 'jpeg' || $mime === 'jpg') ? 'jpg' : (($mime === 'webp') ? 'webp' : 'png');
                
                // Ensure parent uploads and uploads/events folders exist
                $baseUploadDir = __DIR__ . '/../uploads';
                $uploadDir = $baseUploadDir . '/events';
                
                if (!file_exists($baseUploadDir)) {
                    @mkdir($baseUploadDir, 0755, true);
                }
                if (!file_exists($uploadDir)) {
                    @mkdir($uploadDir, 0755, true);
                }
                
                if (!is_writable($uploadDir)) {
                    @chmod($uploadDir, 0755);
                }

                if (!empty($originalName)) {
                    $rawName = pathinfo($originalName, PATHINFO_FILENAME);
                    $cleanSlug = preg_replace('/[^a-zA-Z0-9_\-]/', '_', $rawName);
                    $cleanSlug = strtolower(trim($cleanSlug, '_'));
                    if (!empty($cleanSlug)) {
                        $filename = $cleanSlug . '_' . time() . '.' . $ext;
                    } else {
                        $filename = $prefix . '_' . time() . '_' . rand(100, 999) . '.' . $ext;
                    }
                } else {
                    $filename = $prefix . '_' . time() . '_' . rand(100, 999) . '.' . $ext;
                }

                $filepath = $uploadDir . '/' . $filename;
                if (@file_put_contents($filepath, $data)) {
                    return '/uploads/events/' . $filename;
                } else {
                    error_log("Failed to write event photo to $filepath. Check folder permissions for uploads/events.");
                    throw new Exception("Unable to save image to server directory /uploads/events/. Please verify folder write permissions (755/775).");
                }
            }
        }
    }
    return is_string($img) ? $img : ($imgData ?: '');
}

function normalizeApiImageUrl($url, $title = '', $isCover = false, $index = 0) {
    static $drBladbinPhotos = [
      '/images/events/dr-bladbin-birthday/bladbin-birthday-cover.webp',
      '/images/events/dr-bladbin-birthday/accounts-aligner-reception-jerush.webp',
      '/images/events/dr-bladbin-birthday/aishwarya-with-binila-priya-doctor.webp',
      '/images/events/dr-bladbin-birthday/binila-gift--to-bladbin.webp',
      '/images/events/dr-bladbin-birthday/binila-with-bladbin-cute-moments.webp',
      '/images/events/dr-bladbin-birthday/binila-with-bladbin-soulful-gift.webp',
      '/images/events/dr-bladbin-birthday/birthday-cake-jerush-bladbin.webp',
      '/images/events/dr-bladbin-birthday/bladbin-birthday-cake.webp',
      '/images/events/dr-bladbin-birthday/bladbin-family-portrait.webp',
      '/images/events/dr-bladbin-birthday/cake-cutting-bladbin.webp',
      '/images/events/dr-bladbin-birthday/ceo-with-doctors-team.webp',
      '/images/events/dr-bladbin-birthday/ceo-with-selfie-doctors.webp',
      '/images/events/dr-bladbin-birthday/chief-bladbin-cake-cutting.webp',
      '/images/events/dr-bladbin-birthday/chief-guest-with-bladbin-binila.webp',
      '/images/events/dr-bladbin-birthday/chief-guest-with-doctors.webp',
      '/images/events/dr-bladbin-birthday/dental-assistants-gift-to-bladbin.webp',
      '/images/events/dr-bladbin-birthday/dental-assistants-to-bladbin.webp',
      '/images/events/dr-bladbin-birthday/doctors-jerush-thuckalay-charming-moments.webp',
      '/images/events/dr-bladbin-birthday/doctors-presenting-gifts-bladbin.webp',
      '/images/events/dr-bladbin-birthday/dr-ajay-shalu-vijayalaksmnigift-to-bladbin.webp',
      '/images/events/dr-bladbin-birthday/dr-priya-dharshini-gift-to-bladbin.webp',
      '/images/events/dr-bladbin-birthday/dr-ranisha-ameega-jolly-gift-to-bladbin.webp',
      '/images/events/dr-bladbin-birthday/dr-suryambika-aahina-gift-to-bladbin.webp',
      '/images/events/dr-bladbin-birthday/group-of-doctors-showing-graceful.webp',
      '/images/events/dr-bladbin-birthday/jerush-all-team-thuckalay.webp',
      '/images/events/dr-bladbin-birthday/jerush-all-team-with0fun-overloaded.webp',
      '/images/events/dr-bladbin-birthday/jerush-assistants-gift-bladbin.webp',
      '/images/events/dr-bladbin-birthday/jerush-dental-cosmetic-doctors.webp',
      '/images/events/dr-bladbin-birthday/jerush-doctors-gift-bladbin.webp',
      '/images/events/dr-bladbin-birthday/jerush-doctors-to-bladbin.webp',
      '/images/events/dr-bladbin-birthday/jerush-medical-rep-gift-to-bladbin.webp',
      '/images/events/dr-bladbin-birthday/jerush-thuckalay-doctors.webp',
      '/images/events/dr-bladbin-birthday/jerush-thuckalay-team.webp',
      '/images/events/dr-bladbin-birthday/jerush-thuckaly-doctors-selfies.webp',
      '/images/events/dr-bladbin-birthday/looking-aweful-gift-bladbin.webp',
      '/images/events/dr-bladbin-birthday/looking-the-gifts.webp',
      '/images/events/dr-bladbin-birthday/memories-with-frames.webp',
      '/images/events/dr-bladbin-birthday/prabin-sharing-cake-bladbin-with-love.webp',
      '/images/events/dr-bladbin-birthday/prabin-sharing-cake-bladbin.webp',
      '/images/events/dr-bladbin-birthday/pro-receptionsit-with-binila.webp',
      '/images/events/dr-bladbin-birthday/reception-pro-jerush-thuckalay.webp',
      '/images/events/dr-bladbin-birthday/sharing-cake-binila-bladbin.webp',
      '/images/events/dr-bladbin-birthday/sharing-happy-moments.webp',
      '/images/events/dr-bladbin-birthday/special-edition-cake-landscape.webp',
      '/images/events/dr-bladbin-birthday/special-edition-cake-portrait.webp',
      '/images/events/dr-bladbin-birthday/team-thuckalay-jerush.webp',
      '/images/events/dr-bladbin-birthday/three-gift-frames-in-a-row.webp'
    ];

    static $jerushalignePhotos = [
      '/images/events/jerushaligne-opening-event/jerushaligne-manufacturing-units-open.webp',
      '/images/events/jerushaligne-opening-event/jerushaligne-clear-aligners-unit-open.webp',
      '/images/events/jerushaligne-opening-event/baldbin-father-opening-jerushaligne.webp',
      '/images/events/jerushaligne-opening-event/baldbin-jaja-with-ex-ias.webp',
      '/images/events/jerushaligne-opening-event/binbila-and-bladbin.webp',
      '/images/events/jerushaligne-opening-event/binila-artboard-sign.webp',
      '/images/events/jerushaligne-opening-event/binila-bladbin-children.webp',
      '/images/events/jerushaligne-opening-event/binila-daughter-artboard-sign.webp',
      '/images/events/jerushaligne-opening-event/binila-lighhtening-lamp.webp',
      '/images/events/jerushaligne-opening-event/bladbin-ceo-family-with-jaja-china.webp',
      '/images/events/jerushaligne-opening-event/bladbin-father-artboard-sign.webp',
      '/images/events/jerushaligne-opening-event/bladbin-jerush-family.webp',
      '/images/events/jerushaligne-opening-event/bladbin-with-guests.webp',
      '/images/events/jerushaligne-opening-event/ceramic-teeth-manufacturing-unit.webp',
      '/images/events/jerushaligne-opening-event/ceramic-teeth-unit.webp',
      '/images/events/jerushaligne-opening-event/ceramic-unit-2.webp',
      '/images/events/jerushaligne-opening-event/ceramic-unit.webp',
      '/images/events/jerushaligne-opening-event/cief-gusets-and-bladbin.webp',
      '/images/events/jerushaligne-opening-event/clear-aligner-jerushaligne-drilling-unit.webp',
      '/images/events/jerushaligne-opening-event/clear-aligner-sheet-printing-unit.webp',
      '/images/events/jerushaligne-opening-event/clear-aligner-thermo-unit.webp',
      '/images/events/jerushaligne-opening-event/clear-aligner-unit.webp',
      '/images/events/jerushaligne-opening-event/dental-ceramic-unit.webp',
      '/images/events/jerushaligne-opening-event/jaja-clear-aligner-ceo-china-prismlab.webp',
      '/images/events/jerushaligne-opening-event/jerush-chairman-family.webp',
      '/images/events/jerushaligne-opening-event/jerush-chapel.webp',
      '/images/events/jerushaligne-opening-event/jerush-doctors-ceo.webp',
      '/images/events/jerushaligne-opening-event/jerush-doctors-trichy.webp',
      '/images/events/jerushaligne-opening-event/jerush-escalator.webp',
      '/images/events/jerushaligne-opening-event/jerush-ground-floor.webp',
      '/images/events/jerushaligne-opening-event/jerush-lightings.webp',
      '/images/events/jerushaligne-opening-event/jerush-outdoor.webp',
      '/images/events/jerushaligne-opening-event/jerush-patient-waiting-area.webp',
      '/images/events/jerushaligne-opening-event/jerush-second-floor.webp',
      '/images/events/jerushaligne-opening-event/jerush-thuckaly-entrance.webp',
      '/images/events/jerushaligne-opening-event/jerush-wooden-arts.webp',
      '/images/events/jerushaligne-opening-event/prabin-ceo-family-jerush.webp'
    ];

    if (empty($url) || !is_string($url)) {
        return '';
    }

    $url = str_replace('/images/events/jerushaligne-events/', '/images/events/jerushaligne-opening-event/', $url);

    // Return static paths, uploads, base64, or http URLs directly as-is
    if (strpos($url, '/images/') === 0 || strpos($url, '/uploads/') !== false || strpos($url, 'data:image') === 0 || strpos($url, 'http') === 0) {
        return $url;
    }

    return $url;
}

switch ($method) {
    case 'GET':
        if (isset($_GET['id'])) {
            $id = intval($_GET['id']);
            try {
                // Fetch event details
                $stmt = $db->prepare("SELECT * FROM gallery_events WHERE id = ?");
                $stmt->execute([$id]);
                $event = $stmt->fetch();
                
                if ($event) {
                    $event['id'] = intval($event['id']);
                    $event['cover_image'] = normalizeApiImageUrl($event['cover_image'], $event['title'], true, 0);
                    
                    // Fetch event photos
                    $photoStmt = $db->prepare("SELECT id, image_url FROM gallery_event_photos WHERE event_id = ? ORDER BY id ASC");
                    $photoStmt->execute([$id]);
                    $photos = $photoStmt->fetchAll();
                    
                    foreach ($photos as $idx => &$p) {
                        $p['id'] = intval($p['id']);
                        $p['image_url'] = normalizeApiImageUrl($p['image_url'], $event['title'], false, $idx);
                    }
                    
                    $event['photos'] = $photos;
                    echo json_encode($event);
                } else {
                    http_response_code(404);
                    echo json_encode(["message" => "Event not found."]);
                }
            } catch (Exception $e) {
                http_response_code(500);
                echo json_encode(["message" => $e->getMessage()]);
            }
        } else {
            // Get all events with photo count
            try {
                $sql = "SELECT e.*, COUNT(p.id) as photo_count 
                        FROM gallery_events e 
                        LEFT JOIN gallery_event_photos p ON e.id = p.event_id 
                        WHERE e.status = 'published' OR e.status IS NULL 
                        GROUP BY e.id 
                        ORDER BY e.id DESC";
                        
                // For admin requests, we can return drafts as well
                $isAdminCheck = false;
                try {
                    // Check if token exists in headers without terminating script
                    $headers = getallheaders();
                    if (isset($headers['Authorization']) || isset($headers['X-Admin-Token'])) {
                        verifyAdminToken();
                        $isAdminCheck = true;
                    }
                } catch (Exception $tokenEx) {
                    // Fail silently, treat as public request
                }
                
                if ($isAdminCheck) {
                    $sql = "SELECT e.*, COUNT(p.id) as photo_count 
                            FROM gallery_events e 
                            LEFT JOIN gallery_event_photos p ON e.id = p.event_id 
                            GROUP BY e.id 
                            ORDER BY e.id DESC";
                }

                $stmt = $db->query($sql);
                $rows = $stmt->fetchAll();
                
                foreach ($rows as &$row) {
                    $row['id'] = intval($row['id']);
                    $row['photo_count'] = intval($row['photo_count']);
                    $row['cover_image'] = normalizeApiImageUrl($row['cover_image'], $row['title'], true, 0);
                }
                echo json_encode($rows);
            } catch (Exception $e) {
                http_response_code(500);
                echo json_encode(["message" => $e->getMessage()]);
            }
        }
        break;

    case 'POST':
        verifyAdminToken(); // Secure endpoint
        
        $action = isset($_GET['action']) ? $_GET['action'] : '';
        $input = json_decode(file_get_contents('php://input'), true);
        
        if ($action === 'add_photos') {
            // Add photos to an existing event
            $eventId = isset($input['event_id']) ? intval($input['event_id']) : 0;
            $photos = isset($input['photos']) ? $input['photos'] : [];
            
            if ($eventId <= 0 || empty($photos)) {
                http_response_code(400);
                echo json_encode(["message" => "Event ID and photos array are required."]);
                exit();
            }
            
            try {
                $db->beginTransaction();
                $stmt = $db->prepare("INSERT INTO gallery_event_photos (event_id, image_url) VALUES (?, ?)");
                foreach ($photos as $photo) {
                    if (!empty($photo)) {
                        $savedUrl = saveBase64Image($photo, 'event_photo_' . $eventId);
                        $stmt->execute([$eventId, $savedUrl]);
                    }
                }
                $db->commit();
                
                logActivity("Added photos to event", "Added " . count($photos) . " photos to event ID " . $eventId, "gallery");
                echo json_encode(["success" => true]);
            } catch (Exception $e) {
                $db->rollBack();
                http_response_code(500);
                echo json_encode(["message" => "Failed to add photos: " . $e->getMessage()]);
            }
        } else {
            // Create new event
            $title = isset($input['title']) ? trim($input['title']) : '';
            $description = isset($input['description']) ? trim($input['description']) : '';
            $event_date = isset($input['event_date']) ? trim($input['event_date']) : '';
            $cover_image = isset($input['cover_image']) ? trim($input['cover_image']) : '';
            $status = isset($input['status']) ? trim($input['status']) : 'published';
            $photos = isset($input['photos']) ? $input['photos'] : [];
            
            if (empty($title) || empty($event_date)) {
                http_response_code(400);
                echo json_encode(["message" => "Event Title and Date are required."]);
                exit();
            }
            
            try {
                $db->beginTransaction();
                
                $coverUrl = saveBase64Image($cover_image, 'event_cover');
                $sql = "INSERT INTO gallery_events (title, description, event_date, cover_image, status) VALUES (?, ?, ?, ?, ?)";
                $stmt = $db->prepare($sql);
                $stmt->execute([$title, $description, $event_date, $coverUrl, $status]);
                
                $eventId = $db->lastInsertId();
                
                // Add associated photos if any
                if (!empty($photos)) {
                    $photoStmt = $db->prepare("INSERT INTO gallery_event_photos (event_id, image_url) VALUES (?, ?)");
                    foreach ($photos as $photo) {
                        if (!empty($photo)) {
                            $savedUrl = saveBase64Image($photo, 'event_photo_' . $eventId);
                            $photoStmt->execute([$eventId, $savedUrl]);
                        }
                    }
                }
                
                $db->commit();
                
                logActivity("New event created", "Created event: " . $title . " with " . count($photos) . " photos", "gallery");
                echo json_encode(["success" => true, "id" => intval($eventId)]);
            } catch (Exception $e) {
                $db->rollBack();
                http_response_code(500);
                echo json_encode(["message" => "Failed to create event: " . $e->getMessage()]);
            }
        }
        break;

    case 'PUT':
        verifyAdminToken(); // Secure endpoint
        
        if (!isset($_GET['id'])) {
            http_response_code(400);
            echo json_encode(["message" => "Event ID is required for update."]);
            exit();
        }
        
        $id = intval($_GET['id']);
        $input = json_decode(file_get_contents('php://input'), true);
        
        $title = isset($input['title']) ? trim($input['title']) : '';
        $description = isset($input['description']) ? trim($input['description']) : '';
        $event_date = isset($input['event_date']) ? trim($input['event_date']) : '';
        $cover_image = isset($input['cover_image']) ? trim($input['cover_image']) : '';
        $status = isset($input['status']) ? trim($input['status']) : 'published';
        
        if (empty($title) || empty($event_date)) {
            http_response_code(400);
            echo json_encode(["message" => "Event Title and Date are required."]);
            exit();
        }
        
        try {
            $coverUrl = !empty($cover_image) ? saveBase64Image($cover_image, 'event_cover') : '';
            $sql = "UPDATE gallery_events SET title = ?, description = ?, event_date = ?, cover_image = ?, status = ? WHERE id = ?";
            $stmt = $db->prepare($sql);
            $stmt->execute([$title, $description, $event_date, $coverUrl, $status, $id]);
            
            logActivity("Event updated", "Updated event: " . $title, "gallery");
            echo json_encode(["success" => true]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["message" => "Failed to update event: " . $e->getMessage()]);
        }
        break;

    case 'DELETE':
        verifyAdminToken(); // Secure endpoint
        
        $action = isset($_GET['action']) ? $_GET['action'] : '';
        
        if ($action === 'delete_photo') {
            $photoId = isset($_GET['photo_id']) ? intval($_GET['photo_id']) : 0;
            if ($photoId <= 0) {
                http_response_code(400);
                echo json_encode(["message" => "Photo ID is required."]);
                exit();
            }
            
            try {
                $stmt = $db->prepare("DELETE FROM gallery_event_photos WHERE id = ?");
                $stmt->execute([$photoId]);
                
                logActivity("Deleted event photo", "Deleted photo ID " . $photoId, "gallery");
                echo json_encode(["success" => true]);
            } catch (Exception $e) {
                http_response_code(500);
                echo json_encode(["message" => "Failed to delete photo: " . $e->getMessage()]);
            }
        } else {
            // Delete entire event
            if (!isset($_GET['id'])) {
                http_response_code(400);
                echo json_encode(["message" => "Event ID is required."]);
                exit();
            }
            
            $id = intval($_GET['id']);
            try {
                // Fetch title for logging
                $stmt = $db->prepare("SELECT title FROM gallery_events WHERE id = ?");
                $stmt->execute([$id]);
                $title = $stmt->fetchColumn();
                
                $stmt = $db->prepare("DELETE FROM gallery_events WHERE id = ?");
                $stmt->execute([$id]);
                
                logActivity("Event deleted", "Deleted event: " . $title . " (ID " . $id . ")", "gallery");
                echo json_encode(["success" => true]);
            } catch (Exception $e) {
                http_response_code(500);
                echo json_encode(["message" => "Failed to delete event: " . $e->getMessage()]);
            }
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(["message" => "Method not allowed."]);
        break;
}
