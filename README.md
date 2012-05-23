# SkyLines

Welcome to *SkyLines*, the internet platform for sharing flights!

This project is in an early stage of development.

*SkyLines* is brought to you by the [XCSoar](http://www.xcsoar.org) project.
It is free software; the source code is available [here](http://git.xcsoar.org/cgit/mirror/Skylines.git/)

# Installation and Setup

*SkyLines* is based on the [TurboGears2](http://www.turbogears.org) web framework. For further instructions visit its website. If you don't have it installed yet, install it:

    $ easy_install -i http://tg.gy/current tg.devtools

Install the helper applications from the XCSoar project:

    $ git clone git://git.xcsoar.org/xcsoar/master/xcsoar.git
    $ cd xcsoar
    $ make TARGET=UNIX output/UNIX/bin/AnalyseFlight output/UNIX/bin/FlightPath
    $ cd /opt/
    $ sudo ln -s <path to xcsoar>/output/UNIX skylines

Clone the *SkyLines* repository to your local drive:

    $ git clone git://git.xcsoar.org/xcsoar/mirror/Skylines.git
    $ cd Skylines

Install the required libraries to run *SkyLines* using the setup.py script:

    $ python setup.py develop

*(You might have to install the additional debian packages `libxml2-dev`, `libxslt1-dev` and `python-dev` for the `lxml` dependency)*

Create the project database for any model classes defined:

    $ paster setup-app development.ini

Start the paste http server:

    $ paster serve development.ini

While developing you may want the server to reload after changes in package files (or its dependencies) are saved. This can be achieved easily by adding the --reload option:

    $ paster serve --reload development.ini

Then you are ready to go.

# License

    SkyLines - the free internet platform for sharing flights
    Copyright (C) 2012  The XCSoar project

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.

# Authors

 * Tobias Bieniek (<tobias.bieniek@gmx.de>)
 * Max Kellermann (<max@duempel.org>)
 * Tobias Lohner (<tobias@lohner-net.de>)