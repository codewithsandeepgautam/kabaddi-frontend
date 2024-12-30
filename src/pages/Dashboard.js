import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/shared/Layout';
import { AccountContext } from '../utils/accountContext';
import { CopyToClipboard } from '../utils/copy';
function Dashboard() {
  const { teamsData, scoresData, settingData } = useContext(AccountContext);
  return (
    <Layout>
      <div className="">
        <div className="grid grid-cols-1 gap-6">
          <div className="col-span-1">
            <div className="overflow-x-auto">
              <table className="table-auto text-left w-full border-collapse border border-[#0000005c]">
                <tbody id="">
                  <tr>
                    <th className="bg-[#fff]  py-3 px-4 text-left text-black font-semibold">Main Screen title</th>
                    <td className=" py-3 px-4 bg-[#dddddd7d]">{settingData[0]?.mainScreenTitle}</td>
                  </tr>
                  <tr>
                    <th className="bg-[#fff]  py-3 px-4 text-left text-black font-semibold">Teams</th>
                    <td className=" py-3 px-4 bg-[#dddddd7d]">{teamsData[0]?.teamNameIst} vs {teamsData[0]?.teamNameSec}</td>
                  </tr>
                  <tr>
                    <th className="bg-[#fff]  py-3 px-4 text-left text-black font-semibold">Team 1 Score</th>
                    <td className=" py-3 px-4 bg-[#dddddd7d]">{scoresData[0]?.team1Score}</td>
                  </tr>
                  <tr>
                    <th className="bg-[#fff]  py-3 px-4 text-left text-black font-semibold">Team 2 Score</th>
                    <td className=" py-3 px-4 bg-[#dddddd7d]">{scoresData[0]?.team2Score}</td>
                  </tr>
                  <tr>
                    <th className="bg-[#fff]  py-3 px-4 text-left text-black font-semibold">UPI Number</th>
                    <td className=" py-3 px-4 bg-[#dddddd7d]">62841 50911</td>
                  </tr>
                  <tr>
                    <th className="bg-[#fff]  py-3 px-4 text-left text-black font-semibold">UPI Handle</th>
                    <td className=" py-3 px-4 bg-[#dddddd7d]">62841 50911@ptsbi</td>
                  </tr>
                  <tr>
                    <th className="bg-[#fff]  py-3 px-4 text-left text-black font-semibold">UPI QR Code</th>
                    <td className=" py-3 px-4 bg-[#dddddd7d]"><img className="w-[200px]" src="https://media.istockphoto.com/id/1347277567/vector/qr-code-sample-for-smartphone-scanning-on-white-background.jpg?s=612x612&w=0&k=20&c=PYhWHZ7bMECGZ1fZzi_-is0rp4ZQ7abxbdH_fm8SP7Q=" alt="QR Code" /></td>
                  </tr>
                  <tr>
                    <th className="bg-[#fff]  py-3 px-4 text-left text-black font-semibold">Buy</th>
                    <td className=" py-3 px-4 bg-[#dddddd7d]">
                      Click <span className='text-[#ff0033]'>here</span> or WhatsApp me on <strong>+91 62841 50911</strong> with "Want to buy Scoreboard." with payment screenshot before 12-20 hours from event start.
                    </td>
                  </tr>
                  <tr>
                    <th className="bg-[#fff]  py-3 px-4 text-left text-black font-semibold">Service</th>
                    <td className=" py-3 px-4 bg-[#dddddd7d]">To buy service, WhatsApp on <strong>+91 62841 50911</strong></td>
                  </tr>
                  <tr>
                    <th className="bg-[#fff]  py-3 px-4 text-left text-black font-semibold">How To Use</th>
                    <td className=" py-3 px-4 bg-[#dddddd7d]">
                      Copy Overlay URL &amp; paste it into your broadcasting software.<br /><b>Vmix</b> -&gt; Add Input -&gt; Web Browser<br /><b>OBS</b> -&gt; Add Scene -&gt; Browser<br />
                      a. URL : Copy overlay URL.<br />
                      b. Width : 1920.<br />
                      c. Height : 1080
                    </td>
                  </tr>
                  <tr>
                    <th className="bg-[#fff]  py-3 px-4 text-left text-black font-semibold">Kabaddi Punjab Style Round Kabaddi</th>
                    <td className="py-3 px-4 bg-[#dddddd7d]">
                      <div className="flex flex-wrap justify-left gap-3">
                        <Link to="/managegame" className="btn bg-[#575757] text-white py-3 px-4 rounded-[4px] inline-block">Manage</Link>
                        <Link to="/editscorecamera" className="btn bg-[#c03] text-white py-3 px-4 rounded-[4px] inline-block">Edit Score Camera</Link>
                        <Link to="/editscoreopposite" className="btn bg-[#006] text-white py-3 px-4 rounded-[4px] inline-block">Edit Score Opposite</Link>
                        <Link to="/live" target='_blank' className="btn bg-[#000] text-white py-3 px-4 rounded-[4px] inline-block">Full View T0</Link>
                        <div className="flex justify-center items-center space-x-2">
                          <span className="text-gray-700 inline-block">Overlay URL T0</span>
                          <textarea className="form-textarea w-full max-w-md p-2 rounded-[4px] inline-block" rows="1" readOnly id="url_7">http://localhost:3022/live</textarea>
                          <button className="btn btn-success bg-[#d06] text-white py-3 px-4 rounded-[4px] md:whitespace-nowrap inline-block" onClick={() => CopyToClipboard("http://localhost:3022/live", "Link copied successfully")}>Copy URL T0</button>
                        </div>
                      </div>
                    </td>
                  </tr>

                  {/* Additional Rows */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;
