<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20251124192510 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE caught_fish ADD fishing_lure_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE caught_fish ADD CONSTRAINT FK_70178FC3ED5C6B05 FOREIGN KEY (fishing_lure_id) REFERENCES fishing_lure (id)');
        $this->addSql('CREATE INDEX IDX_70178FC3ED5C6B05 ON caught_fish (fishing_lure_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE caught_fish DROP CONSTRAINT FK_70178FC3ED5C6B05');
        $this->addSql('DROP INDEX IDX_70178FC3ED5C6B05');
        $this->addSql('ALTER TABLE caught_fish DROP fishing_lure_id');
    }
}
