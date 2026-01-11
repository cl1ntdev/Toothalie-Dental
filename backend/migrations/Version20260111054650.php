<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20260111054650 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE activity_log (id INT AUTO_INCREMENT NOT NULL, user_id INT NOT NULL, username VARCHAR(100) NOT NULL, role VARCHAR(50) NOT NULL, action VARCHAR(50) NOT NULL, target_data LONGTEXT NOT NULL, created_at DATETIME NOT NULL, PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE appointment (appointment_id INT AUTO_INCREMENT NOT NULL, appointment_date DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL, emergency TINYINT(1) DEFAULT NULL, user_set_date VARCHAR(50) DEFAULT NULL, status VARCHAR(50) DEFAULT NULL, message VARCHAR(200) DEFAULT NULL, deleted_on DATETIME DEFAULT NULL, patient_id INT NOT NULL, dentist_id INT NOT NULL, schedule_id INT NOT NULL, appointment_type_id INT DEFAULT NULL, service_id INT DEFAULT NULL, INDEX IDX_FE38F8446B899279 (patient_id), INDEX IDX_FE38F8441CE0A142 (dentist_id), INDEX IDX_FE38F844A40BC2D5 (schedule_id), INDEX IDX_FE38F844546FBEBB (appointment_type_id), INDEX IDX_FE38F844ED5CA9E6 (service_id), PRIMARY KEY (appointment_id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE appointment_log (id INT AUTO_INCREMENT NOT NULL, logged_at DATETIME NOT NULL, actor_type VARCHAR(20) NOT NULL, action VARCHAR(100) DEFAULT NULL, message LONGTEXT DEFAULT NULL, snapshot JSON DEFAULT NULL, appointment_id INT DEFAULT NULL, INDEX IDX_206FFFDDE5B533F9 (appointment_id), PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE appointment_type (id INT AUTO_INCREMENT NOT NULL, appointment_name VARCHAR(50) DEFAULT NULL, PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE dentist_service (id INT AUTO_INCREMENT NOT NULL, user_id INT NOT NULL, service_id INT NOT NULL, INDEX IDX_AFE90E7FA76ED395 (user_id), INDEX IDX_AFE90E7FED5CA9E6 (service_id), PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE reminder (id INT AUTO_INCREMENT NOT NULL, information JSON NOT NULL, viewed TINYINT(1) DEFAULT NULL, appointment_id INT DEFAULT NULL, UNIQUE INDEX UNIQ_40374F40E5B533F9 (appointment_id), PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE role (id INT AUTO_INCREMENT NOT NULL, role_name VARCHAR(100) NOT NULL, PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE schedule (scheduleID INT AUTO_INCREMENT NOT NULL, day_of_week VARCHAR(20) NOT NULL, time_slot VARCHAR(20) NOT NULL, dentistID INT NOT NULL, INDEX IDX_5A3811FBDAEDB9B1 (dentistID), PRIMARY KEY (scheduleID)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE service (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(50) NOT NULL, service_type_id INT NOT NULL, INDEX IDX_E19D9AD2AC8DE0F (service_type_id), PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE service_type (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(50) NOT NULL, PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE user (id INT AUTO_INCREMENT NOT NULL, email VARCHAR(180) NOT NULL, username VARCHAR(100) NOT NULL, password VARCHAR(255) NOT NULL, first_name VARCHAR(50) DEFAULT NULL, last_name VARCHAR(50) DEFAULT NULL, created_at DATETIME DEFAULT NULL, roles JSON NOT NULL, disable TINYINT(1) DEFAULT NULL, UNIQUE INDEX UNIQ_8D93D649F85E0677 (username), UNIQUE INDEX UNIQ_IDENTIFIER_EMAIL (email), PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE user_role (id INT AUTO_INCREMENT NOT NULL, user_id INT NOT NULL, role_id INT NOT NULL, INDEX IDX_2DE8C6A3A76ED395 (user_id), INDEX IDX_2DE8C6A3D60322AC (role_id), PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('ALTER TABLE appointment ADD CONSTRAINT FK_FE38F8446B899279 FOREIGN KEY (patient_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE appointment ADD CONSTRAINT FK_FE38F8441CE0A142 FOREIGN KEY (dentist_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE appointment ADD CONSTRAINT FK_FE38F844A40BC2D5 FOREIGN KEY (schedule_id) REFERENCES schedule (scheduleID)');
        $this->addSql('ALTER TABLE appointment ADD CONSTRAINT FK_FE38F844546FBEBB FOREIGN KEY (appointment_type_id) REFERENCES appointment_type (id)');
        $this->addSql('ALTER TABLE appointment ADD CONSTRAINT FK_FE38F844ED5CA9E6 FOREIGN KEY (service_id) REFERENCES service (id)');
        $this->addSql('ALTER TABLE appointment_log ADD CONSTRAINT FK_206FFFDDE5B533F9 FOREIGN KEY (appointment_id) REFERENCES appointment (appointment_id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE dentist_service ADD CONSTRAINT FK_AFE90E7FA76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE dentist_service ADD CONSTRAINT FK_AFE90E7FED5CA9E6 FOREIGN KEY (service_id) REFERENCES service (id)');
        $this->addSql('ALTER TABLE reminder ADD CONSTRAINT FK_40374F40E5B533F9 FOREIGN KEY (appointment_id) REFERENCES appointment (id)');
        $this->addSql('ALTER TABLE schedule ADD CONSTRAINT FK_5A3811FBDAEDB9B1 FOREIGN KEY (dentistID) REFERENCES user (id)');
        $this->addSql('ALTER TABLE service ADD CONSTRAINT FK_E19D9AD2AC8DE0F FOREIGN KEY (service_type_id) REFERENCES service_type (id)');
        $this->addSql('ALTER TABLE user_role ADD CONSTRAINT FK_2DE8C6A3A76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE user_role ADD CONSTRAINT FK_2DE8C6A3D60322AC FOREIGN KEY (role_id) REFERENCES role (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE appointment DROP FOREIGN KEY FK_FE38F8446B899279');
        $this->addSql('ALTER TABLE appointment DROP FOREIGN KEY FK_FE38F8441CE0A142');
        $this->addSql('ALTER TABLE appointment DROP FOREIGN KEY FK_FE38F844A40BC2D5');
        $this->addSql('ALTER TABLE appointment DROP FOREIGN KEY FK_FE38F844546FBEBB');
        $this->addSql('ALTER TABLE appointment DROP FOREIGN KEY FK_FE38F844ED5CA9E6');
        $this->addSql('ALTER TABLE appointment_log DROP FOREIGN KEY FK_206FFFDDE5B533F9');
        $this->addSql('ALTER TABLE dentist_service DROP FOREIGN KEY FK_AFE90E7FA76ED395');
        $this->addSql('ALTER TABLE dentist_service DROP FOREIGN KEY FK_AFE90E7FED5CA9E6');
        $this->addSql('ALTER TABLE reminder DROP FOREIGN KEY FK_40374F40E5B533F9');
        $this->addSql('ALTER TABLE schedule DROP FOREIGN KEY FK_5A3811FBDAEDB9B1');
        $this->addSql('ALTER TABLE service DROP FOREIGN KEY FK_E19D9AD2AC8DE0F');
        $this->addSql('ALTER TABLE user_role DROP FOREIGN KEY FK_2DE8C6A3A76ED395');
        $this->addSql('ALTER TABLE user_role DROP FOREIGN KEY FK_2DE8C6A3D60322AC');
        $this->addSql('DROP TABLE activity_log');
        $this->addSql('DROP TABLE appointment');
        $this->addSql('DROP TABLE appointment_log');
        $this->addSql('DROP TABLE appointment_type');
        $this->addSql('DROP TABLE dentist_service');
        $this->addSql('DROP TABLE reminder');
        $this->addSql('DROP TABLE role');
        $this->addSql('DROP TABLE schedule');
        $this->addSql('DROP TABLE service');
        $this->addSql('DROP TABLE service_type');
        $this->addSql('DROP TABLE user');
        $this->addSql('DROP TABLE user_role');
    }
}
