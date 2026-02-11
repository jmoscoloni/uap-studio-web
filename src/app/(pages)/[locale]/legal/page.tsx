import { Metadata } from 'next';
import getMetadata from '@/utils/functions/getMetadata';
import BackButton from '@/components/common/Button/BackButton';

export default function Page() {
  return (
    <main>
      <section className="relative w-full px-2 pt-8 pb-6 lg:px-4 lg:pt-10 lg:pb-10">
        <div className="p-lg mx-auto w-full max-w-none text-left text-balance text-black">
          <h1 className="mb-0 font-bold text-[#FB2721] uppercase lg:mb-1">
            LEGAL NOTICE AND PRIVACY POLICY
          </h1>
          <p>
            At UAP STUDIO, we respect and value the privacy of users who visit the website
            www.uap-studio.com
          </p>

          <h2 className="mt-1 font-bold lg:mt-2">1. Website Owner</h2>
          <p>
            This website is operated by UAP STUDIO, based in the Republic of Argentina, providing
            creative services to national and international clients.
          </p>

          <h2 className="mt-1 font-bold lg:mt-2">2. Personal Data and Cookies</h2>
          <p>
            This website includes a contact form through which users may voluntarily provide
            personal data, including first name, last name, email address, and message content.
          </p>

          <p>
            This website does not use its own or third-party cookies, tracking technologies,
            analytics tools, or advertising services.
          </p>

          <p>
            The information submitted through the contact form is sent directly to UAP STUDIO’s
            email inbox and is not stored in any database or automated system on this website.
          </p>

          <h2 className="mt-1 font-bold lg:mt-2">3. Purpose of Data Use</h2>
          <p>
            Any personal data voluntarily provided by users through the contact form will be used
            solely to respond to inquiries, provide information about services, or maintain
            professional communications initiated by the user.
          </p>

          <h2 className="mt-1 font-bold lg:mt-2">4. Data Storage and Disclosure</h2>
          <p>
            UAP STUDIO does not sell, share, or transfer personal data to third parties, except when
            required by law or by a competent authority.
          </p>

          <p>
            Personal data received by email will be retained only for as long as necessary to
            fulfill the purpose for which it was provided.
          </p>

          <h2 className="mt-1 font-bold lg:mt-2">5. International Users</h2>
          <p>
            This website may be accessed by users from different countries. All personal data is
            processed in accordance with the applicable laws of the Republic of Argentina.
          </p>

          <h2 className="mt-1 font-bold lg:mt-2">6. User Rights</h2>
          <p>
            Users have the right to access, modify, or request the deletion of their personal data.
            Requests can be made through the contact methods published on this website.
          </p>

          <p>
            This website complies with Argentine Law No. 25,326 on Personal Data Protection. The
            National Directorate for Personal Data Protection is the enforcement authority of this
            law.
          </p>

          <h2 className="mt-1 font-bold lg:mt-2">7. Intellectual Property</h2>
          <p>
            All images, designs, and visual content displayed on this website are original creations
            of UAP STUDIO or are used with proper authorization. Any reproduction, distribution, or
            use without prior written consent is strictly prohibited.
          </p>

          <h2 className="mt-1 font-bold lg:mt-2">8. Policy Updates</h2>
          <p>
            UAP STUDIO reserves the right to update or modify this Legal &amp; Privacy section at
            any time. Any changes will take effect upon publication on this website.
          </p>
        </div>
        <BackButton />
      </section>
    </main>
  );
}

export const metadata: Metadata = getMetadata({ title: 'Legal & Privacy' });
