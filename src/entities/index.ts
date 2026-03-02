/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: alleinstellungsmerkmale
 * Interface for Alleinstellungsmerkmale
 */
export interface Alleinstellungsmerkmale {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  title?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  icon?: string;
  /** @wixFieldType number */
  displayOrder?: number;
  /** @wixFieldType text */
  shortSummary?: string;
}


/**
 * Collection ID: anwendungsfaelle
 * Interface for Anwendungsflle
 */
export interface Anwendungsflle {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  useCaseTitle?: string;
  /** @wixFieldType text */
  solutionDescription?: string;
  /** @wixFieldType text */
  expectedImpact?: string;
  /** @wixFieldType text */
  industry?: string;
  /** @wixFieldType text */
  challenge?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  useCaseImage?: string;
}


/**
 * Collection ID: messbareergebnisse
 * Interface for MessbareErgebnisse
 */
export interface MessbareErgebnisse {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  resultType?: string;
  /** @wixFieldType number */
  value?: number;
  /** @wixFieldType text */
  unit?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType text */
  impactArea?: string;
}


/**
 * Collection ID: transformationsmodell
 * Interface for TransformationsmodellPhasen
 */
export interface TransformationsmodellPhasen {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  phaseName?: string;
  /** @wixFieldType number */
  stepNumber?: number;
  /** @wixFieldType text */
  activityDescription?: string;
  /** @wixFieldType text */
  economicArgument?: string;
  /** @wixFieldType text */
  keyDeliverables?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  phaseImage?: string;
}
