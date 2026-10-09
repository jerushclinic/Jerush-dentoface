<?php
require_once 'db.php';

// Enable CORS headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, OPTIONS");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, X-Admin-Token");

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($method !== 'POST') {
    http_response_code(405);
    echo json_encode(["success" => false, "message" => "Method not allowed. Use POST."]);
    exit();
}

$db = getDB();

// Verify token if available
try {
    verifyAdminToken();
} catch (Exception $e) {
    // If token verification throws, verifyAdminToken already responded with 401
    exit();
}

$rawInput = file_get_contents('php://input');
$input = json_decode($rawInput, true);

$doctorsList = [];
if (isset($input['doctors']) && is_array($input['doctors'])) {
    $doctorsList = $input['doctors'];
} elseif (is_array($input)) {
    $doctorsList = $input;
}

if (empty($doctorsList)) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Doctors payload is required."]);
    exit();
}

try {
    // Auto-check and create sort_order column if not present in doctors table
    $st = $db->query("SHOW COLUMNS FROM `doctors` LIKE 'sort_order'");
    if (!$st->fetch()) {
        $db->exec("ALTER TABLE `doctors` ADD COLUMN `sort_order` INT DEFAULT 0");
    }

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

    echo json_encode([
        "success" => true,
        "updated" => $updatedCount,
        "message" => "Doctor display sequence updated successfully."
    ]);
} catch (Exception $e) {
    if ($db->inTransaction()) {
        $db->rollBack();
    }
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Failed to update doctors sequence: " . $e->getMessage()
    ]);
}
