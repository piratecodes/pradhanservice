import { MongoClient } from 'mongodb';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import * as fs from 'fs';
import * as path from 'path';

// Simple .env parser to read backend env values
function loadEnv() {
  const envPath = path.resolve(__dirname, '../.env');
  if (fs.existsSync(envPath)) {
    const envFile = fs.readFileSync(envPath, 'utf-8');
    envFile.split(/\r?\n/).forEach(line => {
      const parts = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
      if (parts) {
        const key = parts[1];
        let val = parts[2] || '';
        if (val.startsWith('"') && val.endsWith('"')) {
          val = val.substring(1, val.length - 1);
        } else if (val.startsWith("'") && val.endsWith("'")) {
          val = val.substring(1, val.length - 1);
        }
        process.env[key] = val.trim();
      }
    });
  }
}

loadEnv();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/PradhanServices';
const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://postgres:1234@localhost:5432/pradhan_db?schema=public';

async function runMigration() {
  console.log('--- Starting MongoDB to PostgreSQL Migration ---');
  console.log(`MongoDB URI: ${MONGO_URI}`);
  console.log(`PostgreSQL URL: ${DATABASE_URL}`);

  // 1. Connect to MongoDB
  const mongoClient = new MongoClient(MONGO_URI);
  await mongoClient.connect();
  const dbName = MONGO_URI.split('/').pop()?.split('?')[0] || 'PradhanServices';
  const mongoDb = mongoClient.db(dbName);
  console.log(`Connected to MongoDB database: "${dbName}"`);

  // 2. Connect to PostgreSQL via Prisma with pg adapter
  const pool = new Pool({ connectionString: DATABASE_URL });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });
  await prisma.$connect();
  console.log('Connected to PostgreSQL database');

  try {
    // 3. Clear existing Postgres data to prevent unique constraint conflicts
    console.log('\nClearing existing PostgreSQL data for a clean migration...');
    
    await prisma.serviceOption.deleteMany();
    await prisma.lead.deleteMany();
    await prisma.gallery.deleteMany();
    await prisma.contact.deleteMany();
    await prisma.locationPage.deleteMany();
    await prisma.city.deleteMany();
    await prisma.admin.deleteMany();
    
    console.log('PostgreSQL tables cleared successfully.');

    // 4. Migrate Admins
    console.log('\nMigrating Admins...');
    const mongoAdmins = await mongoDb.collection('admins').find({}).toArray();
    console.log(`Found ${mongoAdmins.length} admins in MongoDB.`);
    
    const roleMap: Record<string, 'SUPER_ADMIN' | 'ADMIN' | 'SALES_AGENT'> = {
      'super-admin': 'SUPER_ADMIN',
      'admin': 'ADMIN',
      'sales-agent': 'SALES_AGENT'
    };

    for (const doc of mongoAdmins) {
      const role = roleMap[doc.role] || 'SALES_AGENT';
      await prisma.admin.create({
        data: {
          name: doc.name || '',
          username: doc.username || '',
          email: doc.email || '',
          phone: doc.phone || '',
          dob: doc.dob ? new Date(doc.dob) : null,
          profilePic: doc.profilePic || 'default-avatar.png',
          bio: doc.bio || null,
          designation: doc.designation || null,
          role,
          password: doc.password || '',
          passwordChangedAt: doc.passwordChangedAt ? new Date(doc.passwordChangedAt) : null,
          passwordResetToken: doc.passwordResetToken || null,
          passwordResetExpires: doc.passwordResetExpires ? new Date(doc.passwordResetExpires) : null,
          isActive: typeof doc.isActive === 'boolean' ? doc.isActive : true,
          createdAt: doc.createdAt ? new Date(doc.createdAt) : new Date(),
          updatedAt: doc.updatedAt ? new Date(doc.updatedAt) : new Date()
        }
      });
    }
    console.log('Admins migration complete.');

    // 5. Migrate Cities
    console.log('\nMigrating Cities...');
    const mongoCities = await mongoDb.collection('cities').find({}).toArray();
    console.log(`Found ${mongoCities.length} cities in MongoDB.`);
    
    for (const doc of mongoCities) {
      await prisma.city.create({
        data: {
          cityName: doc.cityName || '',
          citySlug: doc.citySlug || '',
          activeServices: Array.isArray(doc.activeServices) ? doc.activeServices : [],
          subTowns: Array.isArray(doc.subTowns) ? doc.subTowns : [],
          isActive: typeof doc.isActive === 'boolean' ? doc.isActive : true,
          createdAt: doc.createdAt ? new Date(doc.createdAt) : new Date(),
          updatedAt: doc.updatedAt ? new Date(doc.updatedAt) : new Date()
        }
      });
    }
    console.log('Cities migration complete.');

    // 6. Migrate LocationPages
    console.log('\nMigrating LocationPages...');
    const mongoPages = await mongoDb.collection('locationpages').find({}).toArray();
    console.log(`Found ${mongoPages.length} location pages in MongoDB.`);
    
    for (const doc of mongoPages) {
      await prisma.locationPage.create({
        data: {
          citySlug: doc.citySlug || '',
          serviceSlug: doc.serviceSlug || '',
          seoMetaTitle: doc.seo?.metaTitle || null,
          seoMetaDescription: doc.seo?.metaDescription || null,
          seoMetaKeywords: doc.seo?.metaKeywords || null,
          seoCanonicalUrl: doc.seo?.canonicalUrl || null,
          seoIsNoIndex: typeof doc.seo?.isNoIndex === 'boolean' ? doc.seo.isNoIndex : false,
          seoJsonLdSchema: doc.seo?.jsonLdSchema || null,
          headerTitle: doc.header?.title || null,
          headerIntroText: doc.header?.introText || null,
          sections: doc.sections ? JSON.parse(JSON.stringify(doc.sections)) : null,
          createdAt: doc.createdAt ? new Date(doc.createdAt) : new Date(),
          updatedAt: doc.updatedAt ? new Date(doc.updatedAt) : new Date()
        }
      });
    }
    console.log('LocationPages migration complete.');

    // 7. Migrate Contacts
    console.log('\nMigrating Contacts...');
    const mongoContacts = await mongoDb.collection('contacts').find({}).toArray();
    console.log(`Found ${mongoContacts.length} contacts in MongoDB.`);
    
    for (const doc of mongoContacts) {
      await prisma.contact.create({
        data: {
          primaryPhone: doc.primaryPhone || '',
          whatsappNumber: doc.whatsappNumber || null,
          alternatePhone: doc.alternatePhone || null,
          supportEmail: doc.supportEmail || '',
          salesEmail: doc.salesEmail || null,
          headOfficeAddress: doc.headOfficeAddress || '',
          googleMapsLink: doc.googleMapsLink || null,
          facebookUrl: doc.facebookUrl || null,
          instagramUrl: doc.instagramUrl || null,
          twitterUrl: doc.twitterUrl || null,
          linkedinUrl: doc.linkedinUrl || null,
          createdAt: doc.createdAt ? new Date(doc.createdAt) : new Date(),
          updatedAt: doc.updatedAt ? new Date(doc.updatedAt) : new Date()
        }
      });
    }
    console.log('Contacts migration complete.');

    // 8. Migrate Galleries
    console.log('\nMigrating Galleries...');
    const mongoGalleries = await mongoDb.collection('galleries').find({}).toArray();
    console.log(`Found ${mongoGalleries.length} galleries in MongoDB.`);
    
    for (const doc of mongoGalleries) {
      await prisma.gallery.create({
        data: {
          categoryName: doc.categoryName || '',
          slug: doc.slug || '',
          description: doc.description || null,
          isPublished: typeof doc.isPublished === 'boolean' ? doc.isPublished : true,
          featuredImage: doc.featuredImage ? JSON.parse(JSON.stringify(doc.featuredImage)) : null,
          images: doc.images ? JSON.parse(JSON.stringify(doc.images)) : null,
          createdAt: doc.createdAt ? new Date(doc.createdAt) : new Date(),
          updatedAt: doc.updatedAt ? new Date(doc.updatedAt) : new Date()
        }
      });
    }
    console.log('Galleries migration complete.');

    // 9. Migrate Leads
    console.log('\nMigrating Leads...');
    const mongoLeads = await mongoDb.collection('leads').find({}).toArray();
    console.log(`Found ${mongoLeads.length} leads in MongoDB.`);
    
    const leadStatusMap: Record<string, 'NEW' | 'CONTACTED' | 'QUOTED' | 'CONVERTED' | 'LOST'> = {
      'New': 'NEW',
      'Contacted': 'CONTACTED',
      'Quoted': 'QUOTED',
      'Converted': 'CONVERTED',
      'Lost': 'LOST'
    };

    for (const doc of mongoLeads) {
      const status = leadStatusMap[doc.status] || 'NEW';
      await prisma.lead.create({
        data: {
          serviceRequested: doc.serviceRequested || '',
          customerName: doc.customerName || '',
          customerEmail: doc.customerEmail || '',
          customerPhone: doc.customerPhone || '',
          originCity: doc.originCity || '',
          destinationCity: doc.destinationCity || null,
          shiftingDate: doc.shiftingDate ? new Date(doc.shiftingDate) : null,
          customerComment: doc.customerComment || null,
          customFields: doc.customFields ? JSON.parse(JSON.stringify(doc.customFields)) : null,
          status,
          adminNotes: doc.adminNotes || null,
          createdAt: doc.createdAt ? new Date(doc.createdAt) : new Date(),
          updatedAt: doc.updatedAt ? new Date(doc.updatedAt) : new Date()
        }
      });
    }
    console.log('Leads migration complete.');

    // 10. Migrate ServiceOptions
    console.log('\nMigrating ServiceOptions...');
    const mongoOptions = await mongoDb.collection('serviceoptions').find({}).toArray();
    console.log(`Found ${mongoOptions.length} service options in MongoDB.`);
    
    for (const doc of mongoOptions) {
      await prisma.serviceOption.create({
        data: {
          categoryName: doc.categoryName || '',
          serviceType: doc.serviceType || '',
          isActive: typeof doc.isActive === 'boolean' ? doc.isActive : true,
          priceStartingFrom: typeof doc.priceStartingFrom === 'number' ? doc.priceStartingFrom : null,
          description: doc.description || null,
          order: typeof doc.order === 'number' ? doc.order : null,
          createdAt: doc.createdAt ? new Date(doc.createdAt) : new Date(),
          updatedAt: doc.updatedAt ? new Date(doc.updatedAt) : new Date()
        }
      });
    }
    console.log('ServiceOptions migration complete.');

    console.log('\n=========================================');
    console.log('🎉 MongoDB to PostgreSQL migration successfully finished!');
    console.log('=========================================');

  } catch (error) {
    console.error('Migration failed with error:', error);
  } finally {
    // 11. Cleanup Connections
    await mongoClient.close();
    await prisma.$disconnect();
    await pool.end();
  }
}

runMigration();
