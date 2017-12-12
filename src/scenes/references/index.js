/* eslint-env browser */
import React from 'react';
import { Link } from 'react-router-dom';

import './scss/style.scss';

const References = () => {
  document.title = 'References - Design Bright';
  return (
    <main id="references">
      <section className="row">
        <div className="columns small-12">
          <h1><span className="underlined">References</span></h1>
          <h2>All Pages</h2>
          <p>Icons and Icon font from <a href="https://fontawesome.com/">Font Awesome 5</a>.</p>
          <p>Filler text from Brothers Karamazov by Fyodor Dostoyevsky from <a href="https://www.gutenberg.org/ebooks/28054">The Gutenberg Project</a>.</p>
          <p>Paper by Blaq Annabiosis from <a href="https://www.toptal.com/designers/subtlepatterns/paper/">Subtle Patterns</a>.</p>
          <h2><Link to="/home">Home Page</Link></h2>
          <p>DSC03223 by 白夜 from <a href="https://www.flickr.com/photos/kayin00/33975757490/in/photolist-TLjD1f-daXRRc-odWCf9-FNLcEt-Cwocns-a1nigY-cVybBy-gDKRBk-a9gTWz-ssfFYB-c1dqms-GanvKs-fho4is-aeYvyH-daHcg2-Tzr84p-H5Cznh-bpstb-h8Z3kH-nsMac-GVSYTB-daHezf-bBe2pe-CcqAvH-ATmJp2-dPXb8f-dbuqQQ-NM18KA-75E5RH-DVSaZu-8M1Fpt-dxoiFv-eaYKrd-ktRVBx-qqnUFB-exZxMs-rgyyeb-QjdEfY-HCsPPz-8R8h1W-dF7iUU-8HaroT-oqginA-o76Nkd-JMvmai-PN1o2C-zqV29j-qiPfVv-F2nCgh-vJvLjd">Flickr</a>.</p>
          <h2><Link to="/campaigns/browse">Campaign Browse and Search List</Link></h2>
          <p>Veterans Day Parade by Scott Van Schoiack from <a href="https://www.flickr.com/photos/svschoiack/8183186834/in/photolist-dt7Ymb-druT6T-dsSH31-5AF3zY-7fpYua-pKs1kc-azN4yA-pmPfxh-7fu7BN-drv49s-7fqof4-pKousp-cQBxey-rjMLSU-om5Uqy-7fqX4P-drv4E9-azeGUw-ayWZcb-du69dX-bumdD7-7hjRE9-usrw7H-drXfmY-drv4fq-drv4t1-du6ahi-drv4q1-druSLg-du6dC6-druT9D-p1XEmD-7hjRB3-pKoBwz-dubKns-oZAN2B-q2Dpy2-dt2T8k-dsSpbJ-dsSvaX-cm4wA9-dsStF8-dsSDhU-p62pLA-dsSsez-dsSAVC-dsSCPA-dsSqeH-dsSpCy-oo6q7m">Flickr</a>.</p>
          <h2><Link to="/campaign/1">Campaign Page</Link></h2>
          <p>Memorial Day at Home by Mike Procario from <a href="https://www.flickr.com/photos/procario/7290067336/in/photolist-c7cv39-dpNqBQ-9i8iZd-fdhtaX-9WRaHV-6U4iu1-pyvHY5-nesCfL-9DYbXh-6U4eRj-dV4nJj-KkuQsw-6U58PC-rjmnZ-7DvCjz-d9hqQb-7CrYNt-4EJccX-9TrH8r-82TVrz-aNVU4n-9iArho-8vFMda-pHPAv4-4J4b9m-nxHY1K-87rKti-4HYVYZ-d9hs5U-quzwNz-f8RJEm-6U4aTo-VbHChi-unx5LR-VSVJd3-UAv9vj-UZ4FgT-UAvcKA-W36T9m-RvSGGZ-VavASJ-T7BuEr-gb4VZk-k2Mx-51L7Jq-WmzxPu-u5cG3W-Vd3pDz-b7g1Ec-pUHwEA">Flickr</a>.</p>
          <p>Veterans Day Parade by Scott Van Schoiack from <a href="https://www.flickr.com/photos/svschoiack/8183186834/in/photolist-dt7Ymb-druT6T-dsSH31-5AF3zY-7fpYua-pKs1kc-azN4yA-pmPfxh-7fu7BN-drv49s-7fqof4-pKousp-cQBxey-rjMLSU-om5Uqy-7fqX4P-drv4E9-azeGUw-ayWZcb-du69dX-bumdD7-7hjRE9-usrw7H-drXfmY-drv4fq-drv4t1-du6ahi-drv4q1-druSLg-du6dC6-druT9D-p1XEmD-7hjRB3-pKoBwz-dubKns-oZAN2B-q2Dpy2-dt2T8k-dsSpbJ-dsSvaX-cm4wA9-dsStF8-dsSDhU-p62pLA-dsSsez-dsSAVC-dsSCPA-dsSqeH-dsSpCy-oo6q7m">Flickr</a>.</p>
          <br/>
          <br/>
          <p>All other content was created by Simeon Smith © 2017.</p>
        </div>
      </section>
    </main>
  );
};

export default References;
