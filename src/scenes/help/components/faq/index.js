/* eslint-env browser */
import React from 'react';

import Heading from '../../../../components/heading';

import './scss/style.scss';

const FAQ = () => (
  <section id="FAQ">
    <Heading type="h1" text="Frequently Asked Questions" />
    <ul>
      <li>
        <a href="#FAQ1">
          FAQ Question #1
        </a>
      </li>
      <li>
        <a href="#FAQ2">
          FAQ Question #2
        </a>
      </li>
      <li>
        <a href="#FAQ3">
          FAQ Question #3
        </a>
      </li>
      <li>
        <a href="#FAQ4">
          FAQ Question #4
        </a>
      </li>
    </ul>
    <article id="FAQ1">
      <Heading type="h2" text="FAQ Question #1" />
      <p>
        The mother was sitting on a chair by the side of her daughter’s invalid carriage, and two
        paces from her stood an old monk, not one of our monastery, but a visitor from an
        obscure religious house in the far north. He too sought the elder’s blessing.
      </p>
    </article>
    <article id="FAQ2">
      <Heading type="h2" text="FAQ Question #2" />
      <p>
        But Father Zossima, on entering the portico, went first straight to the peasants who were
        crowded at the foot of the three steps that led up into the portico. Father Zossima stood
        on the top step, put on his stole, and began blessing the women who thronged about
        him. One crazy woman was led up to him. As soon as she caught sight of the elder she
        began shrieking and writhing as though in the pains of childbirth. Laying the stole on her
        forehead, he read a short prayer over her, and she was at once soothed and quieted.
      </p>
    </article>
    <article id="FAQ3">
      <Heading type="h2" text="FAQ Question #3" />
      <p>
        He blessed them all and talked with some of them. The “possessed” woman he knew
        already. She came from a village only six versts from the monastery, and had been
        brought to him before.
      </p>
    </article>
    <article id="FAQ4">
      <Heading type="h2" text="FAQ Question #4" />
      <p>
        “Townfolk we are, Father, townfolk. Yet we are peasants though we live in the town.
        I have come to see you, O Father! We heard of you, Father, we heard of you. I have
        buried my little son, and I have come on a pilgrimage. I have been in three monasteries,
        but they told me, ‘Go, Nastasya, go to them’—that is to you. I have come; I was yesterday
        at the service, and to‐day I have come to you.”
      </p>
    </article>
  </section>
);

export default FAQ;
