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
const TermsandConditionSection = () => {
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
              Terms and conditions
            </Typography>
          </Box>

          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
            sx={{ justifyContent: "center", display: "flex" }}
          >
            <Link
              href="/"
              sx={{
                display: "flex",
                alignItems: "center",
                color: "#c24300",
                fontSize: "24px",
              }}
            >
              Home
            </Link>
            <Typography sx={{ color: "#00584b", fontSize: "24px" }}>
              Terms & conditions:
            </Typography>
          </Breadcrumbs>
        </Container>
      </Box>

      {/* Content Section */}
      <Box sx={{ py: 6 }}>
        <Container maxWidth="lg">
          <Box
            sx={{
              backgroundColor: "#f9faf7",
              p: 4,
              borderRadius: 1,
              color: "#4a4a4a",
              maxWidth: "900px",
              margin: "auto",
            }}
          >
            <Typography paragraph>
              Welcome to comebackorganic.com. The following are the rules{" "}
              <b style={{ color: "green" }}>(&ldquo; Terms &rdquo;)</b> that
              govern the use of the comebackorganic.com Website
              (&ldquo;Site&rdquo;). By adding information, using or visiting the
              Site, you agree that you have read, understood and are bound by
              the terms and conditions set out herein, and all applicable laws
              and regulations, governing the Site, including but not limited to
              any additional or amended terms or condition as applicable from
              time to time, regardless of how you subscribed to or use the
              services.
            </Typography>

            <Typography paragraph>
              ComeBackOrganic.com (Our company) reserves the right to change
              these Terms at any time, effective immediately upon posting on the
              site.
            </Typography>

            <Typography variant="h5" sx={{ mt: 4, mb: 1 }}>
              Registering with ComeBackOrganic.com
            </Typography>
            <Typography paragraph>
              In order to take advantage of certain features on the Site, you
              may be required to register with ComeBackOrganic.com. For example,
              you may be required to register if you want to set up a &ldquo;My
              Profile&rdquo; on ComeBackOrganic.com, where you can view a record
              of your contributions in the form of articles, ratings, blogs,
              feedback, get email alerts, etc.
            </Typography>

            <Typography variant="h5" sx={{ mt: 4, mb: 1 }}>
              Authentication Service
            </Typography>
            <Typography paragraph>
              ComeBackOrganic.com may permit you to register for the Website
              through certain third-party services, such as Facebook Connect and
              Google (&ldquo;Authentication Service&rdquo;). By registering for
              the Website using an Authentication Service, you agree that
              ComeBackOrganic.com may access your account information from the
              Authentication Service and you agree to any and all terms of use
              of Authentication Service regarding your use of the Website via
              the Authentication Service. You agree that any Authentication
              Service is a Reference Site and you are solely responsible for
              your interactions with the Authentication Service as a result of
              accessing the Website through the Authentication Service.
            </Typography>
            <Typography paragraph>
              ComeBackOrganic.com only collects your Personal Information to
              conduct its business and to enable itself to deliver and improve
              its Services.
            </Typography>
            <Typography paragraph>
              ComeBackOrganic.com will only disclose your Personal Information
              in accordance with our Privacy Policy.
            </Typography>
            <Typography paragraph>
              If you decline to submit personal information to us, then,
              unfortunately, we will not be in a position to provide the
              Services to you.
            </Typography>
            <Typography paragraph>
              Any of your information which you provide when you use
              ComeBackOrganic.com in an unencrypted manner and/or to an open,
              public environment or forum including (without limitation) any
              blog, chat room, albums, community, classifieds or discussion
              board, is not confidential, does not constitute Personal
              Information, and is not subject to protection under Privacy
              Policy.
            </Typography>
            <Typography paragraph>
              Since such public environments are accessible by third parties, it
              is possible that third parties may collect, collate and use such
              information for their own purposes. You should accordingly be
              careful while deciding to share any of your Personal Information
              in such public environments. ComeBackOrganic.com is not liable to
              you or any third party for any damages that you or any third party
              may suffer howsoever arising from your disclosure of Personal
              Information in any public environment. Please accordingly disclose
              your information in this public environment at your own risk.
            </Typography>

            <Typography variant="h5" sx={{ mt: 4, mb: 1 }}>
              ComeBackOrganic.com Account
            </Typography>
            <Typography paragraph>
              If you register for a ComeBackOrganic.com account, you will be
              allowed to save and personalize ComeBackOrganic.com content,
              receive, add, and view comments/blogs/ratings from existing and
              future features provided by the ComeBackOrganic.com system, and
              post ratings and articles about ComeBackOrganic.com businesses and
              other user articles. By having an account with
              ComeBackOrganic.com, you agree to take full responsibility for
              maintaining the confidentiality of your account user name,
              password, and all related activity that occurs under your account
              user name. If you violate these Terms, ComeBackOrganic.com may, at
              its sole discretion, terminate your accounts, remove or modify any
              account-related content or access (including, but not limited to,
              articles, and user profile information), or take any other action
              that ComeBackOrganic.com believes is appropriate.
            </Typography>

            <Typography variant="h5" sx={{ mt: 4, mb: 1 }}>
              Access and Interference
            </Typography>
            <Typography paragraph>
              You agree that you will not use any robot, spider, other automatic
              devices, or manual process to monitor or copy our pages or the
              content contained thereon or for any other unauthorized purpose
              without our prior expressed written permission. You agree that you
              will not use any device, software, or routine to interfere or
              attempt to interfere with the proper working of the Site. You
              agree that you will not copy, reproduce, alter, modify, create
              derivative works from, or publicly display any content (except for
              your own personal, non-commercial use) from our Web site without
              the prior expressed written permission of ComeBackOrganic.com.
            </Typography>

            <Typography variant="h5" sx={{ mt: 4, mb: 1 }}>
              Violation of the terms
            </Typography>
            <Typography paragraph>
              You agree that monetary damages may not provide a sufficient
              remedy to ComeBackOrganic.com for violations of these terms of use
              and you consent to injunctive or other equitable relief for such
              violations.
            </Typography>

            <Typography variant="h5" sx={{ mt: 4, mb: 1 }}>
              Disclaimers
            </Typography>
            <Typography paragraph>
              ComeBackOrganic.com does not promise that the site will be
              inoffensive, error-free or uninterrupted, or that it will provide
              specific information from the use of the site or any content,
              search, or link on it. The site and its content are delivered on
              an “as-is” and “as-available” basis. ComeBackOrganic.com cannot
              ensure that files you download from the site will be free of
              viruses or contamination or destructive features.
              ComeBackOrganic.com disclaims all warranties, express or implied,
              including any implied warranties of merchantability and fitness
              for a particular purpose. ComeBackOrganic.com will not be liable
              for any damages of any kind arising from the use of this site,
              including, without limitation, direct, indirect, incidental, and
              punitive and consequential damages.
            </Typography>

            <Typography variant="h5" sx={{ mt: 4, mb: 1 }}>
              Unauthorized use of the site
            </Typography>
            <Typography paragraph>
              Illegal and/or unauthorized uses of the Site, including, but not
              limited to, unauthorized framing of or linking to the Site or
              unauthorized use of any robot, spider, or other automated devices
              on the Site, will be investigated and subject to appropriate legal
              action, including, without limitation, civil, criminal, and
              injunctive redress.
            </Typography>
            <Typography paragraph>
              ComeBackOrganic.com disclaims any and all liability for the acts,
              omissions, and conduct of any third-party users,
              ComeBackOrganic.com users, advertisers, and/or sponsors on the
              Site, in connection with the Site, or otherwise related to your
              use of the Site. ComeBackOrganic.com is not responsible for the
              products, services, actions, or failure to act of any third party
              in connection with or referenced on the Site.
            </Typography>

            <Typography variant="h5" sx={{ mt: 4, mb: 1 }}>
              Limitation of liability
            </Typography>
            <Typography paragraph>
              In no event shall ComeBackOrganic.com and/or its employee,
              affiliates be liable for any direct, indirect, punitive,
              incidental, special, consequential damages or any damages
              whatsoever including, without limitation, damages for loss of use,
              data or profits, arising out of or in any way connected with the
              use or performance of ComeBackOrganic.com sites/services, with the
              delay or inability to use ComeBackOrganic.com sites/services or
              related services, the provision of or failure to provide services,
              or for any information, software, products, services and related
              graphics obtained through ComeBackOrganic.com sites/services, or
              otherwise arising out of the use of ComeBackOrganic.com
              sites/services, whether based on contract, tort, negligence,
              strict liability or otherwise, even if ComeBackOrganic.com or any
              of employees, affiliates had been advised of the possibility of
              damages.
            </Typography>
            <Typography paragraph>
              Any product or promotion of a product on the Service are not
              sponsored, endorsed or administered by, or in any other way
              associated with, Facebook. Facebook has no control over Content,
              Contributions or other information and opinion expressed via the
              Service.
            </Typography>

            <Typography variant="h5" sx={{ mt: 4, mb: 1 }}>
              Disputes
            </Typography>
            <Typography paragraph>
              If there is any dispute about or involving the Site, you, by using
              the Site, agree that the dispute will be governed by the laws of
              the Republic of India without regard to its conflict-of-law
              provisions. You agree to personal jurisdiction by and venue in
              Bangalore, and the prevailing law of State of Karnataka and
              Government of India will be applicable.
            </Typography>

            <Typography variant="h5" sx={{ mt: 4, mb: 1 }}>
              Posting profiles, articles, and blogs on ComeBackOrganic.com
            </Typography>
            <Typography paragraph>
              ComeBackOrganic.com reserves the right, but not the obligation, to
              refuse to post or to remove any Profile, Comment, or Blog if it
              contains or features any of the following:
            </Typography>

            <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
              Unacceptable content:
            </Typography>
            <Typography paragraph>
              Offensive, harmful and/or abusive language, including without
              limitation: expletives, profanities, obscenities, harassment,
              vulgarities, sexually explicit language and hate speech (e.g.,
              racist/discriminatory speech.) Articles that do not address the
              food community or articles with no qualitative value as determined
              by ComeBackOrganic.com in its sole discretion. Articles that
              comment on other users. Content that contains personal attacks or
              describes physical confrontations and/or sexual harassment.
              Personal information or messages including email addresses, URLs,
              phone numbers and postal addresses. Messages that are advertising
              or commercial in nature, or are inappropriate based on the
              applicable subject matter. Language that violates the standards of
              good taste or the standards of this website, as determined by
              ComeBackOrganic.com in its sole discretion. Content determined by
              ComeBackOrganic.com to be illegal or to violate any central,
              state, or local law or regulation or the rights of any other
              person or entity. Language intended to impersonate other users
              (including names of other individuals) or offensive or
              inappropriate usernames or signatures. Articles that scrape or
              re-purpose other people’s content without permission. Protected by
              copyright or trademark and used, in any manner on
              ComeBackOrganic.com without the permission of the author or the
              owner; Defamatory; illegal; hateful; pornographic; or harmful.
            </Typography>

            <Typography component="p" sx={{ fontWeight: "bold", mt: 3 }}>
              Note:
            </Typography>
            <Typography paragraph>
              We are not able to police every article we include on
              ComeBackOrganic.com, so we will make mistakes. If we’ve approved
              an article on our site which you feel is misappropriating your
              content, please let us know at{" "}
              <a href="mailto:contact@comebackorganic.com">
                contact@comebackorganic.com
              </a>
              . ComeBackOrganic.com team will exercise its discretion on such
              subjects based on statistics, user feedback.
            </Typography>

            <Typography variant="h5" sx={{ mt: 4, mb: 1 }}>
              Copyright
            </Typography>
            <List dense>
              <ListItem>
                <ListItemText primary="All rights of any content added by users on ComeBackOrganic.com shall be owned by the users." />
              </ListItem>
              <ListItem>
                <ListItemText primary="ComeBackOrganic.com is not responsible for content posted by users or third parties on the Site." />
              </ListItem>
              <ListItem>
                <ListItemText primary="By posting any content on ComeBackOrganic.com, you grant ComeBackOrganic.com a worldwide, royalty-free, perpetual, irrevocable, and sublicensable right to use, reproduce, modify, adapt, publish, translate, create derivative works from, distribute, perform, and display such content in any media." />
              </ListItem>
            </List>

            <Typography paragraph sx={{ mt: 3 }}>
              All copyrights, trademarks, logos, and service marks displayed on
              the Site are the property of their respective owners and protected
              by applicable intellectual property laws.
            </Typography>
            <Typography paragraph>
              Your use of the Site does not grant you any rights in connection
              with any trademarks, logos, or service marks displayed on the
              Site.
            </Typography>

            <Typography variant="h5" sx={{ mt: 4, mb: 1 }}>
              General Terms
            </Typography>
            <List dense>
              <ListItem>
                <ListItemText primary="You are solely responsible for the content you post on ComeBackOrganic.com." />
              </ListItem>
              <ListItem>
                <ListItemText primary="ComeBackOrganic.com reserves the right to remove or modify any content for any reason without prior notice." />
              </ListItem>
              <ListItem>
                <ListItemText primary="You agree to indemnify and hold harmless ComeBackOrganic.com from any claims, damages, or losses resulting from your use of the Site." />
              </ListItem>
            </List>

            <Typography paragraph sx={{ mt: 3 }}>
              If you have questions or concerns about these Terms & Conditions,
              please contact us at{" "}
              <a href="mailto:contact@comebackorganic.com">
                contact@comebackorganic.com
              </a>
              .
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default TermsandConditionSection;
