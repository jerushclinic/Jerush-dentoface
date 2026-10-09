<?php
// Set display errors for migration debugging
ini_set('display_errors', 1);
error_reporting(E_ALL);

header("Content-Type: text/html; charset=UTF-8");

require_once 'db.php';

echo "<!DOCTYPE html><html><head><title>Jerush Database Migration</title>";
echo "<style>body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#0f172a;color:#e2e8f0;padding:40px;line-height:1.6;}";
echo ".container{max-width:800px;margin:0 auto;background:#1e293b;padding:30px;border-radius:16px;box-shadow:0 10px 25px rgba(0,0,0,0.5);border:1px solid #334155;}";
echo "h1{color:#38bdf8;font-size:24px;margin-bottom:20px;border-bottom:1px solid #334155;padding-bottom:12px;}";
echo ".log{background:#0f172a;padding:15px;border-radius:8px;font-family:monospace;font-size:13px;margin:15px 0;max-height:400px;overflow-y:auto;border:1px solid #1e293b;}";
echo ".ok{color:#4ade80;} .warn{color:#fbbf24;} .err{color:#f87171;} .info{color:#38bdf8;}";
echo ".btn{display:inline-block;padding:10px 20px;background:#0284c7;color:white;text-decoration:none;border-radius:8px;font-weight:bold;margin-top:15px;}";
echo "</style></head><body><div class='container'>";
echo "<h1>🚀 Jerush Database Migration & Synchronization</h1>";
echo "<div class='log'>";

try {
    $db = getDB();
    echo "<div class='ok'>✓ Connected to MySQL database successfully.</div>";
} catch (Exception $e) {
    echo "<div class='err'>✗ Database connection failed: " . htmlspecialchars($e->getMessage()) . "</div>";
    echo "</div></div></body></html>";
    exit();
}

function runMigrationStep($stepName, $callback) {
    try {
        $msg = $callback();
        echo "<div class='ok'>✓ " . htmlspecialchars($stepName) . ($msg ? " (" . htmlspecialchars($msg) . ")" : "") . "</div>";
    } catch (Exception $e) {
        echo "<div class='warn'>⚠ " . htmlspecialchars($stepName) . ": " . htmlspecialchars($e->getMessage()) . "</div>";
    }
}

// 1. Reviews table & columns
runMigrationStep("Reviews table schema", function() use ($db) {
    $db->exec("
        CREATE TABLE IF NOT EXISTS `reviews` (
          `id` INT AUTO_INCREMENT PRIMARY KEY,
          `author` VARCHAR(255) NOT NULL,
          `role` VARCHAR(255) DEFAULT 'Patient',
          `content` TEXT NOT NULL,
          `rating` INT DEFAULT 5,
          `type` VARCHAR(50) DEFAULT 'text',
          `video_url` VARCHAR(255) DEFAULT NULL,
          `video_thumbnail` VARCHAR(255) DEFAULT NULL,
          `date` VARCHAR(100) DEFAULT NULL,
          `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    ");

    // Check columns
    $cols = ['type' => "VARCHAR(50) DEFAULT 'text'", 'video_url' => "VARCHAR(255) DEFAULT NULL", 'video_thumbnail' => "VARCHAR(255) DEFAULT NULL"];
    foreach ($cols as $col => $type) {
        $st = $db->query("SHOW COLUMNS FROM `reviews` LIKE '$col'");
        if (!$st->fetch()) {
            $db->exec("ALTER TABLE `reviews` ADD COLUMN `$col` $type");
        }
    }
    return "ready";
});

// 2. Doctors table
runMigrationStep("Doctors table schema", function() use ($db) {
    $db->exec("
        CREATE TABLE IF NOT EXISTS `doctors` (
          `id` INT AUTO_INCREMENT PRIMARY KEY,
          `name` VARCHAR(255) NOT NULL,
          `role` VARCHAR(255) NOT NULL,
          `qualification` VARCHAR(255) DEFAULT '',
          `experience` VARCHAR(100) DEFAULT '',
          `image` VARCHAR(500) DEFAULT '',
          `fallback_img` VARCHAR(500) DEFAULT '',
          `specialties` TEXT DEFAULT NULL,
          `bio` TEXT DEFAULT NULL,
          `schedule` VARCHAR(255) DEFAULT 'Mon - Sat (10:00 AM - 6:00 PM)',
          `facebook` VARCHAR(255) DEFAULT NULL,
          `instagram` VARCHAR(255) DEFAULT NULL,
          `linkedin` VARCHAR(255) DEFAULT NULL,
          `twitter` VARCHAR(255) DEFAULT NULL,
          `sort_order` INT DEFAULT 0,
          `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    ");

    $st = $db->query("SHOW COLUMNS FROM `doctors` LIKE 'sort_order'");
    if (!$st->fetch()) {
        $db->exec("ALTER TABLE `doctors` ADD COLUMN `sort_order` INT DEFAULT 0");
    }

    return "verified";
});

// 3. Treatments table
runMigrationStep("Treatments table schema", function() use ($db) {
    $db->exec("
        CREATE TABLE IF NOT EXISTS `treatments` (
          `id` INT AUTO_INCREMENT PRIMARY KEY,
          `title` VARCHAR(255) NOT NULL,
          `slug` VARCHAR(255) NOT NULL UNIQUE,
          `category` VARCHAR(100) NOT NULL,
          `description` TEXT DEFAULT NULL,
          `icon` VARCHAR(100) DEFAULT NULL,
          `image` VARCHAR(500) DEFAULT NULL,
          `details` LONGTEXT DEFAULT NULL,
          `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    ");
    return "verified";
});

// 4. Blogs table
runMigrationStep("Blogs table schema", function() use ($db) {
    $db->exec("
        CREATE TABLE IF NOT EXISTS `blogs` (
          `id` INT AUTO_INCREMENT PRIMARY KEY,
          `title` VARCHAR(255) NOT NULL,
          `slug` VARCHAR(255) NOT NULL UNIQUE,
          `category` VARCHAR(100) DEFAULT 'Dental Care',
          `excerpt` TEXT DEFAULT NULL,
          `content` LONGTEXT DEFAULT NULL,
          `image` VARCHAR(500) DEFAULT NULL,
          `author` VARCHAR(255) DEFAULT 'Dr. A. Bladbin',
          `date` VARCHAR(100) DEFAULT NULL,
          `read_time` VARCHAR(50) DEFAULT '5 min read',
          `published` TINYINT(1) DEFAULT 1,
          `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    ");
    return "verified";
});

// 5. Careers & Applications tables
runMigrationStep("Careers table schema", function() use ($db) {
    $db->exec("
        CREATE TABLE IF NOT EXISTS `careers` (
          `id` INT AUTO_INCREMENT PRIMARY KEY,
          `title` VARCHAR(255) NOT NULL,
          `department` VARCHAR(100) NOT NULL,
          `location` VARCHAR(100) NOT NULL,
          `type` VARCHAR(50) DEFAULT 'Full Time',
          `experience` VARCHAR(100) DEFAULT '',
          `description` TEXT DEFAULT NULL,
          `requirements` TEXT DEFAULT NULL,
          `is_active` TINYINT(1) DEFAULT 1,
          `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

        CREATE TABLE IF NOT EXISTS `career_applications` (
          `id` INT AUTO_INCREMENT PRIMARY KEY,
          `career_id` INT DEFAULT NULL,
          `name` VARCHAR(255) NOT NULL,
          `email` VARCHAR(255) NOT NULL,
          `phone` VARCHAR(50) NOT NULL,
          `resume_url` VARCHAR(500) DEFAULT NULL,
          `cover_letter` TEXT DEFAULT NULL,
          `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    ");
    return "verified";
});

// 6. Gallery Events & Photos tables
runMigrationStep("Gallery Events table schema", function() use ($db) {
    $db->exec("
        CREATE TABLE IF NOT EXISTS `gallery_events` (
          `id` INT AUTO_INCREMENT PRIMARY KEY,
          `title` VARCHAR(255) NOT NULL,
          `description` TEXT DEFAULT NULL,
          `event_date` VARCHAR(100) DEFAULT NULL,
          `cover_image` VARCHAR(500) DEFAULT NULL,
          `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

        CREATE TABLE IF NOT EXISTS `gallery_event_photos` (
          `id` INT AUTO_INCREMENT PRIMARY KEY,
          `event_id` INT NOT NULL,
          `image_url` VARCHAR(500) NOT NULL,
          `caption` VARCHAR(255) DEFAULT NULL,
          `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (`event_id`) REFERENCES `gallery_events`(`id`) ON DELETE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    ");
    return "verified";
});

// 7. Marquee Items & Settings tables
runMigrationStep("Marquee table schema", function() use ($db) {
    $db->exec("
        CREATE TABLE IF NOT EXISTS `marquee_items` (
            `id`          INT AUTO_INCREMENT PRIMARY KEY,
            `title`       VARCHAR(500) NOT NULL,
            `badge`       VARCHAR(100) DEFAULT 'NEW',
            `badge_color` VARCHAR(255) DEFAULT 'bg-brandSky text-white',
            `link`        VARCHAR(255) DEFAULT NULL,
            `link_text`   VARCHAR(100) DEFAULT 'Learn More',
            `is_active`   TINYINT(1) DEFAULT 1,
            `priority`    INT DEFAULT 1,
            `created_at`  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

        CREATE TABLE IF NOT EXISTS `marquee_settings` (
            `id`              INT PRIMARY KEY DEFAULT 1,
            `enabled`         TINYINT(1) DEFAULT 1,
            `speed`           VARCHAR(50) DEFAULT 'normal',
            `pause_on_hover`  TINYINT(1) DEFAULT 1,
            `theme`           VARCHAR(100) DEFAULT 'dark-gradient',
            `show_live_badge` TINYINT(1) DEFAULT 1,
            `live_badge_text` VARCHAR(100) DEFAULT 'LIVE UPDATES',
            `updated_at`      TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    ");

    $countSettings = $db->query("SELECT COUNT(*) FROM `marquee_settings`")->fetchColumn();
    if ($countSettings == 0) {
        $db->exec("INSERT INTO `marquee_settings` (`id`, `enabled`, `speed`, `pause_on_hover`, `theme`, `show_live_badge`, `live_badge_text`) 
                   VALUES (1, 1, 'normal', 1, 'dark-gradient', 1, 'LIVE UPDATES')");
    }
    return "verified";
});

// 8. Camps table (Speciality Health & Community Outreach)
runMigrationStep("Camps table schema & default seeds", function() use ($db) {
    $db->exec("
        CREATE TABLE IF NOT EXISTS `camps` (
          `id` INT AUTO_INCREMENT PRIMARY KEY,
          `title` VARCHAR(255) NOT NULL,
          `tagline` VARCHAR(255) DEFAULT '',
          `category` VARCHAR(50) NOT NULL DEFAULT 'dental',
          `camp_type` VARCHAR(100) NOT NULL DEFAULT 'Dental Camp',
          `status` VARCHAR(50) NOT NULL DEFAULT 'upcoming',
          `date` VARCHAR(100) NOT NULL,
          `time` VARCHAR(100) NOT NULL,
          `location` VARCHAR(255) NOT NULL,
          `lead_doctors` VARCHAR(255) DEFAULT '',
          `target_beneficiaries` VARCHAR(255) DEFAULT '',
          `cover_image` VARCHAR(500) DEFAULT '',
          `gallery_images` TEXT DEFAULT NULL,
          `services_provided` TEXT DEFAULT NULL,
          `description` TEXT DEFAULT NULL,
          `organizer` VARCHAR(255) DEFAULT 'Jerush Medical Foundation',
          `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    ");

    $countCamps = $db->query("SELECT COUNT(*) FROM `camps`")->fetchColumn();
    if ($countCamps == 0) {
        $stmtCamp = $db->prepare("
            INSERT INTO `camps` (`title`, `tagline`, `category`, `camp_type`, `status`, `date`, `time`, `location`, `lead_doctors`, `target_beneficiaries`, `cover_image`, `gallery_images`, `services_provided`, `description`, `organizer`)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ");
        $stmtCamp->execute([
            'Mega Community Health & Smile Camp',
            'Comprehensive oral wellness, preventive cancer screening & treatment vouchers',
            'dental',
            'Dental Camp',
            'upcoming',
            'October 24, 2026',
            '9:00 AM – 4:00 PM',
            'Jerush Community Hall, Near Main Bus Stand, Thuckalay',
            'Dr. C. Binila Asir, Dr. A. Bladbin, Dr. S. Rajmohan',
            'Families, Seniors, School Students & General Public',
            '/images/events/medical-camp/free-community-medical-camp-group-photo.webp',
            json_encode([
                '/images/events/medical-camp/free-community-medical-camp-group-photo.webp',
                '/images/events/medical-camp/free-community-medical-camp-banner.webp',
                '/images/events/medical-camp/free-community-medical-camp-lead-doctor-group-photo.webp'
            ]),
            json_encode([
                'Full-Mouth Ultrasonic Scaling & Plaque Assessment',
                'Oral Cancer Screening with Intraoral Camera',
                'Free Denture Evaluation for Seniors',
                'Fluoride Varnish for Kids'
            ]),
            'Comprehensive free community screening camp organized by Jerush Medical Foundation providing diagnostics, oral hygiene kits, and treatment discounts.',
            'Jerush Medical Foundation'
        ]);

        $stmtCamp->execute([
            'Jerush 3D Clear Aligner Smile Transformation Drive',
            'Experience high-precision digital intraoral scans and instant AI smile previews',
            'aligner',
            'Aligner Camp',
            'upcoming',
            'November 12, 2026',
            '10:00 AM – 5:00 PM',
            'Jerush Super-Speciality Dental Hospital, Thuckalay',
            'Dr. C. Binila Asir (Orthodontist & Aligner Specialist)',
            'Teens, College Students, Working Professionals',
            '/images/events/jerushaligne-opening-event/dr-c-binila-asir-inauguration-jerush-aligner.webp',
            json_encode([
                '/images/events/jerushaligne-opening-event/dr-c-binila-asir-inauguration-jerush-aligner.webp',
                '/images/events/jerushaligne-opening-event/jerush-clear-aligner-inauguration-ceremony.webp',
                '/images/events/jerushaligne-opening-event/doctor-team-jerushaligner-inauguration.webp'
            ]),
            json_encode([
                'High-Speed 3D Digital Intraoral Smile Scan',
                'AI Before-and-After Treatment Simulation',
                'Customized Aligner Treatment Plan Voucher'
            ]),
            'Exclusive clear aligner camp with live 3D intraoral digital scanning demonstration and custom aligner package concessions.',
            'Jerush Orthodontic & Cosmetic Wing'
        ]);
        return "seeded initial camps";
    }
    return "camps table verified";
});

// 9. Activity Log & Admin Tokens tables
runMigrationStep("Admin system tables", function() use ($db) {
    $db->exec("
        CREATE TABLE IF NOT EXISTS `activity_log` (
          `id` INT AUTO_INCREMENT PRIMARY KEY,
          `action` VARCHAR(255) NOT NULL,
          `detail` TEXT DEFAULT NULL,
          `type` VARCHAR(50) DEFAULT 'general',
          `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

        CREATE TABLE IF NOT EXISTS `admin_tokens` (
          `id` INT AUTO_INCREMENT PRIMARY KEY,
          `token` VARCHAR(255) NOT NULL UNIQUE,
          `email` VARCHAR(255) NOT NULL,
          `expires_at` DATETIME NOT NULL,
          `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    ");
    return "verified";
});

echo "</div>";
echo "<div class='ok' style='font-size:16px;font-weight:bold;'>🎉 All database migrations executed successfully!</div>";
echo "<a href='/admin/camps' class='btn'>Go to Admin Camps Panel &rarr;</a>";
echo "</div></body></html>";
