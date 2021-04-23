import Container from "../components/layout/Container";
import Measure from "../components/layout/Measure";
import SEO from "../components/utilities/SEO";
import useTranslation from 'next-translate/useTranslation';

const PrivacyPolicy = (props: React.PropsWithChildren<{}>) => {
  const { t } = useTranslation();

  return(
    <Container>
      <SEO title="Privacy Policy" pathname="/privacy-policy"/>

      <Measure>
        <h2>{t("menu:privacy-policy")}</h2>
        
        <h3>Content copyright</h3>
        <p>
          We fully own the copyrights and related rights including economic rights of all contents created by our content creators and our entire content team, 
          regardless of whether they are for commercial or non-commercial uses.
        </p>
        <br/><br/>

        <h3>What information we collect</h3>
        <p>
          When you browse this website, you give us your full consent to collect your basic information and transfer your data to third party analytics and 
          service providers so that we can analyze them in order to improve our content, user experience and interface. We collect your information whether you have an account on this website or not.
          We use common internet technologies, such as cookies and web server logs.
        </p>
        <p>
          The information we collect from all visitors to our website includes the visitor’s browser type, language preference, referring site, 
          additional websites requested, and the date and time of each visitor request. We also collect potentially personally-identifying information like Internet Protocol (IP) addresses.
        </p>
        <p>
          We are regulated under the laws of the Kingdom of Cambodia and are not responsible for inclusion of privacy or data protection laws of other jurisdictions.
        </p>
        <br/><br/>

        <h3>Our use of cookies and tracking</h3>
        <p>
          <b>Cookies: </b>Mediaload uses cookies to make interactions with our service easy and meaningful. We use cookies to keep you logged in and remember your preferences. 
          We also use cookies to identify a device, for security reasons. By using our website, you agree that we can place these types of cookies on your computer or device. 
          If you disable your browser or device’s ability to accept cookies, you will not be able to log in or use Mediaload's services.
        </p>
        <p>
          <b>Tracking and Analytics: </b>We use a number of third party analytics and service providers to help us evaluate our users' use of Mediaload; 
          compile statistical reports on activity; and improve our content and website performance.
        </p>
      </Measure>
    </Container>
  );
}

export default PrivacyPolicy;