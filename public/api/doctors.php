<?php
require_once 'db.php';

$db = getDB();
$method = $_SERVER['REQUEST_METHOD'];

// Helper to ensure sort_order column exists
function ensureDoctorSortOrderColumn($db) {
    try {
        $st = $db->query("SHOW COLUMNS FROM `doctors` LIKE 'sort_order'");
        if (!$st->fetch()) {
            $db->exec("ALTER TABLE `doctors` ADD COLUMN `sort_order` INT DEFAULT 0");
        }
    } catch (Exception $e) {
        // Ignore if error or permission restricted
    }
}

ensureDoctorSortOrderColumn($db);

// Handle direct reorder action on doctors.php?action=reorder
if (isset($_GET['action']) && $_GET['action'] === 'reorder' && ($method === 'POST' || $method === 'PUT')) {
    verifyAdminToken();
    $input = json_decode(file_get_contents('php://input'), true);
    $doctorsList = isset($input['doctors']) && is_array($input['doctors']) ? $input['doctors'] : (is_array($input) ? $input : []);

    if (empty($doctorsList)) {
        http_response_code(400);
        echo json_encode(["success" => false, "message" => "Doctors payload is required."]);
        exit();
    }

    try {
        $db->beginTransaction();
        $stmt = $db->prepare("UPDATE `doctors` SET `sort_order` = ? WHERE `id` = ?");
        $updatedCount = 0;
        foreach ($doctorsList as $index => $item) {
            $docId = null;
            $order = $index + 1;
            if (is_array($item)) {
                $docId = isset($item['id']) ? intval($item['id']) : null;
                if (isset($item['sort_order']) && is_numeric($item['sort_order'])) {
                    $order = intval($item['sort_order']);
                }
            } elseif (is_numeric($item)) {
                $docId = intval($item);
            }

            if ($docId && $docId > 0) {
                $stmt->execute([$order, $docId]);
                $updatedCount++;
            }
        }
        $db->commit();
        logActivity("Doctors reordered", "Updated sequence of " . $updatedCount . " doctors", "doctor");
        echo json_encode(["success" => true, "updated" => $updatedCount, "message" => "Doctors reordered successfully."]);
        exit();
    } catch (Exception $e) {
        if ($db->inTransaction()) {
            $db->rollBack();
        }
        http_response_code(500);
        echo json_encode(["success" => false, "message" => "Failed to reorder doctors: " . $e->getMessage()]);
        exit();
    }
}

switch ($method) {
    case 'GET':
        if (isset($_GET['id'])) {
            // Get single doctor
            $id = intval($_GET['id']);
            try {
                $stmt = $db->prepare("SELECT * FROM doctors WHERE id = ?");
                $stmt->execute([$id]);
                $doc = $stmt->fetch();
                if ($doc) {
                    $doc['id'] = intval($doc['id']);
                    $doc['sort_order'] = isset($doc['sort_order']) ? intval($doc['sort_order']) : 0;
                    $doc['specialties'] = json_decode($doc['specialties'], true);
                    echo json_encode($doc);
                } else {
                    http_response_code(404);
                    echo json_encode(["message" => "Doctor not found."]);
                }
            } catch (Exception $e) {
                http_response_code(500);
                echo json_encode(["message" => $e->getMessage()]);
            }
        } else {
            // Get all doctors ordered by sort_order ascending
            try {
                $stmt = $db->query("SELECT * FROM doctors ORDER BY sort_order ASC, id ASC");
                $rows = $stmt->fetchAll();
                foreach ($rows as &$row) {
                    $row['id'] = intval($row['id']);
                    $row['sort_order'] = isset($row['sort_order']) ? intval($row['sort_order']) : 0;
                    $row['specialties'] = json_decode($row['specialties'], true);
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
        $input = json_decode(file_get_contents('php://input'), true);
        
        $name = isset($input['name']) ? trim($input['name']) : '';
        $role = isset($input['role']) ? trim($input['role']) : '';
        $qualification = isset($input['qualification']) ? trim($input['qualification']) : '';
        $experience = isset($input['experience']) ? trim($input['experience']) : '';
        $image = isset($input['image']) ? trim($input['image']) : '';
        $fallback_img = isset($input['fallbackImg']) ? trim($input['fallbackImg']) : '';
        $specialties = isset($input['specialties']) ? $input['specialties'] : [];
        $bio = isset($input['bio']) ? trim($input['bio']) : '';
        $schedule = isset($input['schedule']) ? trim($input['schedule']) : 'Mon - Sat (10:00 AM - 6:00 PM)';
        $facebook = isset($input['facebook']) ? trim($input['facebook']) : '';
        $instagram = isset($input['instagram']) ? trim($input['instagram']) : '';
        $linkedin = isset($input['linkedin']) ? trim($input['linkedin']) : '';
        $twitter = isset($input['twitter']) ? trim($input['twitter']) : '';
        
        $sort_order = isset($input['sort_order']) && is_numeric($input['sort_order']) ? intval($input['sort_order']) : 0;
        if ($sort_order <= 0) {
            try {
                $maxOrder = $db->query("SELECT MAX(sort_order) FROM doctors")->fetchColumn();
                $sort_order = ($maxOrder ? intval($maxOrder) : 0) + 1;
            } catch (Exception $e) {
                $sort_order = 1;
            }
        }
        
        if (empty($name) || empty($role)) {
            http_response_code(400);
            echo json_encode(["message" => "Name and Role are required."]);
            exit();
        }
        
        try {
            $specialtiesJson = json_encode($specialties);
            $sql = "INSERT INTO doctors (name, role, qualification, experience, image, fallback_img, specialties, bio, schedule, facebook, instagram, linkedin, twitter, sort_order) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            $stmt = $db->prepare($sql);
            $stmt->execute([$name, $role, $qualification, $experience, $image, $fallback_img, $specialtiesJson, $bio, $schedule, $facebook, $instagram, $linkedin, $twitter, $sort_order]);
            
            $newId = $db->lastInsertId();
            logActivity("Doctor profile added", "Added " . $name . " as " . $role, "doctor");
            echo json_encode(["success" => true, "id" => intval($newId), "sort_order" => $sort_order]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["message" => "Failed to add doctor: " . $e->getMessage()]);
        }
        break;

    case 'PUT':
        verifyAdminToken(); // Secure endpoint
        if (!isset($_GET['id'])) {
            http_response_code(400);
            echo json_encode(["message" => "Doctor ID is required for update."]);
            exit();
        }
        $id = intval($_GET['id']);
        $input = json_decode(file_get_contents('php://input'), true);
        
        $name = isset($input['name']) ? trim($input['name']) : '';
        $role = isset($input['role']) ? trim($input['role']) : '';
        $qualification = isset($input['qualification']) ? trim($input['qualification']) : '';
        $experience = isset($input['experience']) ? trim($input['experience']) : '';
        $image = isset($input['image']) ? trim($input['image']) : '';
        $fallback_img = isset($input['fallbackImg']) ? trim($input['fallbackImg']) : '';
        $specialties = isset($input['specialties']) ? $input['specialties'] : [];
        $bio = isset($input['bio']) ? trim($input['bio']) : '';
        $schedule = isset($input['schedule']) ? trim($input['schedule']) : '';
        $facebook = isset($input['facebook']) ? trim($input['facebook']) : '';
        $instagram = isset($input['instagram']) ? trim($input['instagram']) : '';
        $linkedin = isset($input['linkedin']) ? trim($input['linkedin']) : '';
        $twitter = isset($input['twitter']) ? trim($input['twitter']) : '';
        
        if (empty($name) || empty($role)) {
            http_response_code(400);
            echo json_encode(["message" => "Name and Role are required."]);
            exit();
        }
        
        try {
            $specialtiesJson = json_encode($specialties);
            
            if (isset($input['sort_order']) && is_numeric($input['sort_order'])) {
                $sort_order = intval($input['sort_order']);
                $sql = "UPDATE doctors SET name = ?, role = ?, qualification = ?, experience = ?, image = ?, fallback_img = ?, specialties = ?, bio = ?, schedule = ?, facebook = ?, instagram = ?, linkedin = ?, twitter = ?, sort_order = ? WHERE id = ?";
                $stmt = $db->prepare($sql);
                $stmt->execute([$name, $role, $qualification, $experience, $image, $fallback_img, $specialtiesJson, $bio, $schedule, $facebook, $instagram, $linkedin, $twitter, $sort_order, $id]);
            } else {
                $sql = "UPDATE doctors SET name = ?, role = ?, qualification = ?, experience = ?, image = ?, fallback_img = ?, specialties = ?, bio = ?, schedule = ?, facebook = ?, instagram = ?, linkedin = ?, twitter = ? WHERE id = ?";
                $stmt = $db->prepare($sql);
                $stmt->execute([$name, $role, $qualification, $experience, $image, $fallback_img, $specialtiesJson, $bio, $schedule, $facebook, $instagram, $linkedin, $twitter, $id]);
            }
            
            logActivity("Doctor profile updated", "Updated " . $name . " details", "doctor");
            echo json_encode(["success" => true, "message" => "Doctor updated successfully."]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["message" => "Failed to update doctor: " . $e->getMessage()]);
        }
        break;

    case 'DELETE':
        verifyAdminToken(); // Secure endpoint
        if (!isset($_GET['id'])) {
            http_response_code(400);
            echo json_encode(["message" => "Doctor ID is required."]);
            exit();
        }
        $id = intval($_GET['id']);
        try {
            // Fetch doctor name for logging
            $nstmt = $db->prepare("SELECT name FROM doctors WHERE id = ?");
            $nstmt->execute([$id]);
            $docName = $nstmt->fetchColumn() ?: "ID $id";

            $stmt = $db->prepare("DELETE FROM doctors WHERE id = ?");
            $stmt->execute([$id]);
            
            logActivity("Doctor profile deleted", "Deleted doctor " . $docName, "doctor");
            echo json_encode(["success" => true, "message" => "Doctor deleted successfully."]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["message" => "Failed to delete doctor: " . $e->getMessage()]);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(["message" => "Method not allowed."]);
        break;
}
