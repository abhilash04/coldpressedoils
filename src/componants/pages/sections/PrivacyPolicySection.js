import React from "react";
import {
  Box,
  Typography,
  Breadcrumbs,
  Link,
  Container,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import bgImage from "../../../assets/breadcrumb-bg.webp";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
const PrivacyPolicySection = () => {
      const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  return (
    <Box
      component="main"
      sx={{ backgroundColor: "#f5f5f5" }}
      className="innerpage-bg"
    >
      {/* Page Title & Breadcrumbs */}
      <Box
        sx={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 2 }}>
            <Typography
              sx={{ fontSize: "35px", fontWeight: 600, color: "#27272f " }}
            >
              Privacy Policy
            </Typography>
          </Box>

          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
            sx={{ justifyContent: "center", display: "flex" }}
          >
            <Link
              href="/"
              sx={{ display: "flex", alignItems: "center",color:'#c24300',fontSize:'24px' }}
            >
              Home
            </Link>
            <Typography sx={{color:'#00584b',fontSize:'24px'}}>Privacy Policy:</Typography>
          </Breadcrumbs>
        </Container>
      </Box>

      {/* Content Section */}
      <Box sx={{ py: 6 }}>
        <Container maxWidth="lg">
          <Box
            sx={{
              backgroundColor: "#f5f7ef",
              p: 4,
              borderRadius: 1,
              boxShadow: 1,
              color:' #6a6a6dff'
            }}
          >
            <Typography paragraph>
              ComeBackOrganic will only disclose your Personal Information in
              accordance with this Privacy Policy. If you decline to submit
              personal information to us, then, unfortunately, we will not be in
              a position to provide the Services to you.
            </Typography>

            <Typography paragraph>
              Any of your personal information which you provide when you use
              comebackorganic in an unencrypted manner and/or to an open, public
              environment or forum including (without limitation) any blog, chat
              room, albums, community, classifieds or discussion board, is not
              confidential, does not constitute Personal Information, and is not
              subject to protection under Privacy Policy.
            </Typography>

            <Typography paragraph>
              Since such public environments are accessible by third parties, it
              is possible that third parties may collect and collate and use
              such information for their own purposes. You should accordingly be
              careful when deciding to share any of your Personal Information in
              such public environments.
            </Typography>

            <Typography paragraph>
              ComeBackOrganic is not liable to you or any third party for any damages
              that you or any third party may suffer howsoever arising from your
              disclosure of Personal Information in any public environment.
              Disclose your personal information in a public environment at your
              own risk.
            </Typography>

            <Typography paragraph>
              This privacy policy has been compiled to better serve those who
              are concerned with how their 'Personally Identifiable Information'
              (PII) is being used online. PII, as described in US privacy law
              and information security, is information that can be used on its
              own or with other information to identify, contact, or locate a
              single person, or to identify an individual in context. Please
              read our privacy policy carefully to get a clear understanding of
              how we collect, use, protect or otherwise handle your Personally
              Identifiable Information in accordance with our website.
            </Typography>

            <Typography variant="h5" sx={{ mt: 4, mb: 2, fontWeight: 600 }}>
              What personal information do we collect from the people that visit
              our blog, website or app?
            </Typography>

            <Typography paragraph>
              When ordering or registering on our site, as appropriate, you may
              be asked to enter your name, email address, mailing address, phone
              number, credit card information or other details to help you with
              your experience.
            </Typography>

            <Typography paragraph>
              If you decide to register through or otherwise grant access to a
              third party, social networking or authentication services that we
              may make available ("Authentication Service"), such as Facebook
              Connect or Google, ComeBackOrganic may also collect any such "identity
              information" that you have provided to the Authentication Service
              from the account you have with the Authentication Service.
            </Typography>

            <Typography paragraph>
              Details of transactions by your Facebook friends and other
              Facebook users generated by you through our Service.
            </Typography>

            <Typography paragraph>
              If you choose to provide such information, during registration or
              otherwise, you are giving ComeBackOrganic the permission to use and
              store it consistent with this policy.
            </Typography>

            <Typography variant="h5" sx={{ mt: 4, mb: 2, fontWeight: 600 }}>
              When do we collect information?
            </Typography>

            <Typography paragraph>
              We collect information from you when you register on our site,
              place an order, subscribe to a newsletter or enter information on
              our site.
            </Typography>

            <Typography variant="h5" sx={{ mt: 4, mb: 2, fontWeight: 600 }}>
              How do we use your information?
            </Typography>

            <Typography paragraph>
              We may use the information we collect from you when you register,
              make a purchase, sign up for our newsletter, respond to a survey
              or marketing communication, surf the website, or use certain other
              site features in the following ways:
            </Typography>

            <List dense sx={{ pl: 2, mb: 2 }}>
              <ListItem
                sx={{ display: "list-item", listStyleType: "disc", pl: 1 }}
              >
                <ListItemText primary="To personalize your experience and to allow us to deliver the type of content and product offerings in which you are most interested." />
              </ListItem>
              <ListItem
                sx={{ display: "list-item", listStyleType: "disc", pl: 1 }}
              >
                <ListItemText primary="To quickly process your transactions." />
              </ListItem>
            </List>

            <Typography variant="h5" sx={{ mt: 4, mb: 2, fontWeight: 600 }}>
              How do we protect your information?
            </Typography>

            <Typography paragraph>
              We do not use vulnerability scanning and/or scanning to PCI
              standards. An external PCI compliant payment gateway handles all
              CC transactions. We use regular Malware Scanning.
            </Typography>

            <Typography paragraph>
              Your personal information is contained behind secured networks and
              is only accessible by a limited number of persons who have special
              access rights to such systems, and are required to keep the
              information confidential. In addition, all sensitive/credit
              information you supply is encrypted via Secure Socket Layer (SSL)
              technology.
            </Typography>

            <Typography paragraph>
              We implement a variety of security measures when a user places an
              order enters, submits, or accesses their information to maintain
              the safety of your personal information.
            </Typography>

            <Typography paragraph>
              For your convenience we may store your credit card information
              longer than 30 days in order to expedite future orders, and to
              automate the billing process.
            </Typography>

            <Typography variant="h5" sx={{ mt: 4, mb: 2, fontWeight: 600 }}>
              Do we use 'cookies'?
            </Typography>

            <Typography paragraph>
              Yes. Cookies are small files that a site or its service provider
              transfers to your computer's hard drive through your Web browser
              (if you allow) that enables the site's or service provider's
              systems to recognize your browser and capture and remember certain
              information. For instance, we use cookies to help us remember and
              process the items in your shopping cart. They are also used to
              help us understand your preferences based on previous or current
              site activity, which enables us to provide you with improved
              services. We also use cookies to help us compile aggregate data
              about site traffic and site interaction so that we can offer
              better site experiences and tools in the future.
            </Typography>

            <Typography variant="h5" sx={{ mt: 4, mb: 2, fontWeight: 600 }}>
              We use cookies to:
            </Typography>

            <Typography paragraph>
              Compile aggregate data about site traffic and site interactions in
              order to offer better site experiences and tools in the future. We
              may also use trusted third-party services that track this
              information on our behalf.
            </Typography>

            <Typography paragraph>
              You can choose to have your computer warn you each time a cookie
              is being sent, or you can choose to turn off all cookies. You do
              this through your browser settings. Since browser is a little
              different, look at your browser's Help Menu to learn the correct
              way to modify your cookies.
            </Typography>

            <Typography paragraph>
              If you turn cookies off, Some of the features that make your site
              experience more efficient may not function properly.It won't
              affect the user's experience that make your site experience more
              efficient and may not function properly.
            </Typography>

            <Typography variant="h5" sx={{ mt: 4, mb: 2, fontWeight: 600 }}>
              Third-party disclosure
            </Typography>

            <Typography paragraph>
              We do not sell, trade, or otherwise transfer to outside parties
              your Personally Identifiable Information.
            </Typography>

            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
              Third-party links
            </Typography>

            <Typography paragraph>
              We do not include or offer third-party products or services on our
              website.
            </Typography>

            <Typography variant="h5" sx={{ mt: 4, mb: 2, fontWeight: 600 }}>
              We collect your email address in order to:
            </Typography>

            <List dense sx={{ pl: 2, mb: 2 }}>
              <ListItem
                sx={{ display: "list-item", listStyleType: "disc", pl: 1 }}
              >
                <ListItemText primary="Send information, respond to inquiries, and/or other requests or questions" />
              </ListItem>
              <ListItem
                sx={{ display: "list-item", listStyleType: "disc", pl: 1 }}
              >
                <ListItemText primary="Process orders and to send information and updates pertaining to orders." />
              </ListItem>
              <ListItem
                sx={{ display: "list-item", listStyleType: "disc", pl: 1 }}
              >
                <ListItemText primary="Send you additional information related to your product and/or service" />
              </ListItem>
              <ListItem
                sx={{ display: "list-item", listStyleType: "disc", pl: 1 }}
              >
                <ListItemText primary="Market to our mailing list or continue to send emails to our clients after the original transaction has occurred." />
              </ListItem>
            </List>

            <Typography variant="h5" sx={{ mt: 4, mb: 2, fontWeight: 600 }}>
              To be in accordance with CANSPAM, we agree to the following:
            </Typography>

            <List dense sx={{ pl: 2, mb: 2 }}>
              <ListItem
                sx={{ display: "list-item", listStyleType: "disc", pl: 1 }}
              >
                <ListItemText primary="Not use false or misleading subjects or email addresses." />
              </ListItem>
              <ListItem
                sx={{ display: "list-item", listStyleType: "disc", pl: 1 }}
              >
                <ListItemText primary="Identify the message as an advertisement in some reasonable way." />
              </ListItem>
              <ListItem
                sx={{ display: "list-item", listStyleType: "disc", pl: 1 }}
              >
                <ListItemText primary="Include the physical address of our business or site headquarters." />
              </ListItem>
              <ListItem
                sx={{ display: "list-item", listStyleType: "disc", pl: 1 }}
              >
                <ListItemText primary="Monitor third-party email marketing services for compliance, if one is used." />
              </ListItem>
              <ListItem
                sx={{ display: "list-item", listStyleType: "disc", pl: 1 }}
              >
                <ListItemText primary="Honor opt-out/unsubscribe requests quickly." />
              </ListItem>
              <ListItem
                sx={{ display: "list-item", listStyleType: "disc", pl: 1 }}
              >
                <ListItemText primary="Allow users to unsubscribe by using the link at the bottom of each email." />
              </ListItem>
            </List>

            <Typography variant="h5" sx={{ mt: 4, mb: 2, fontWeight: 600 }}>
              Disclosure of information
            </Typography>

            <Typography paragraph>
              Social Networks: ComeBackOrganic will disclose your personal
              information if you have explicitly agreed that we may do so. In
              particular, we will disclose personal information where you have
              elected to connect your account on our Website to a social network
              or other similar services (e.g., Facebook or Google), or have
              elected to have your activity on our Website published to a social
              network or other similar service (e.g., Facebook or Google). To
              control the information that you share, you should review and, if
              appropriate, modify your privacy settings on such services.
            </Typography>

            <Typography paragraph>
              Required by Law: Gouvanda, may also disclose user information if
              required to do so by law or in the good-faith belief that such
              action is necessary to comply with state and other governing
              bodies.
            </Typography>

            <Typography paragraph>
              Merger or Acquisition: In the event that ComeBackOrganic is acquired by
              or merged with a third-party entity, we reserve the right, in any
              of these circumstances, to transfer or assign the information that
              we have collected from users as part of such merger, acquisition,
              sale, or other change of control.
            </Typography>

            <Typography paragraph>
              Other Purposes: ComeBackOrganic also reserves the right to disclose
              user information that we believe, in good faith, is appropriate or
              necessary to take precautions against liability; protect
              Gouvandanfrom fraudulent, abusive, or unlawful uses; to
              investigate and defend ourselves against any third-party claims or
              allegations; to assist government enforcement agencies; to protect
              the security or integrity of the Website; or to protect the
              rights, property, or personal safety of ComeBackOrganic, our Users, or
              others.
            </Typography>

            <Typography paragraph>
              If at any time you would like to unsubscribe from receiving future
              emails, you can email us at contact@comebackorganic and we will
              promptly remove you from ALL correspondence.
            </Typography>

            <Typography paragraph>
              If there are any questions regarding this privacy policy, you may
              contact us using the information contact us at
              "https://comebackorganic.in"
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default PrivacyPolicySection;
