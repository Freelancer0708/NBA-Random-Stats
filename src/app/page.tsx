"use client";

import { useState, useEffect } from "react";

// データの型定義
type TeamData = {
  fileName: string;
  data: {
    team: string;
    points: { player: string; stats: number };
    assists: { player: string; stats: number };
    rebounds: { player: string; stats: number };
    // 必要に応じて他のプロパティを追加
  }[];
};

export default function Home() {
  const [allData, setAllData] = useState<TeamData[]>([]); // APIから取得する全データ
  const [randomTeams, setRandomTeams] = useState<TeamData[]>([]); // ランダムに選ばれた5チーム
  const [sum, setSum] = useState(0); // 合計得点
  const [result, setResult] = useState("Failure"); // 成否

  // APIから全データを取得
  useEffect(() => {
    fetch("/api/all-teams")
      .then((response) => response.json())
      .then((data: TeamData[]) => setAllData(data))
      .catch((error) => console.error("Failed to fetch data:", error));
  }, []);

  // ランダムボタンのクリックイベント
  function Ramdom() {
    if (allData.length === 0) {
      alert("Data is not loaded yet!");
      return;
    }

    // 全データからランダムに5つのチームを選択
    const shuffled = [...allData].sort(() => 0.5 - Math.random());
    const selectedTeams = shuffled.slice(0, 5);
    setRandomTeams(selectedTeams);

    // 合計得点を計算
    const totalPoints = selectedTeams.reduce((acc, team) => {
      return acc + team.data[0].points.stats;
    }, 0);

    setSum(totalPoints);
    setResult(totalPoints > 100000 ? "Success" : "Failure");
  }

  return (
    <div className="container">
      <h1>NBA Random Most Team Points Player</h1>
      <h2>Reach 100,000 pts with 5 Player</h2>
      <p className="sum">Total : {sum.toLocaleString()} pts</p>
      <p className="result">Result : {result}</p>
      <section className="ramdom">
        {randomTeams.map((team, index) => (
          <div className={`box box0${index + 1}`} key={index}>
            <p className="team">{team.fileName.replace(".json", "").replace(/_/g, " ")}</p>
            <p className="player">
              {team.data[0].points.player}
            </p>
            <p className="stats">
              {team.data[0].points.stats.toLocaleString()} pts
            </p>
          </div>
        ))}
      </section>
      <button onClick={Ramdom}>Start</button>
    </div>
  );
}
