CREATE TABLE `puspak-ai`.`vehicle` ( `id` INT NOT NULL AUTO_INCREMENT , `licensePlateNumber` VARCHAR(256) NOT NULL , `manufacturerName` VARCHAR(256) NOT NULL , `model` VARCHAR(128) NOT NULL , `fuelType` ENUM('petrol','desiel','electric') NOT NULL , `ownerName` VARCHAR(128) NOT NULL , `rc_status` ENUM('Active','Inactive') NOT NULL , `vehicleColor` VARCHAR(56) NOT NULL , `registrationDate` DATE NOT NULL , `insuranceUpto` DATE NOT NULL , `fitnessUpto` DATE NOT NULL , `roadTaxUpto` DATE NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;


CREATE TABLE `puspak-ai`.`violation` ( `id` INT NOT NULL AUTO_INCREMENT , `licensePlateNumber` VARCHAR(256) NOT NULL , `violationType` VARCHAR(128) NOT NULL , `status` ENUM('paid','unpaid') NOT NULL , `date` DATE NOT NULL , `time` TIME NOT NULL , `location` VARCHAR(128) NOT NULL , `videoUrl` TEXT NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;


ALTER TABLE violation ADD FOREIGN KEY (licensePlateNumber) REFERENCES vehicle(licensePlateNumber);