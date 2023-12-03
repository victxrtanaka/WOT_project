import MQTTSingleton from "../lib/mqttSingleton.js";

 
export const startChallenge3 = (req, res) => {
  try {
    // MQTTSingleton.getClient()
    //   .subscribeOnce("prop4/index")
    //   .then(() => {
    //     res.status(200).json("startChallenge4");
    //   });
    MQTTSingleton.getClient().publish("startChallenge3");
  } catch (e) {
    console.error(e);
  }
};

export const puzzleCompleteProp3 = (req, res) => {
  try {
    // Subscribe to the puzzleComplete topic and respond to the client once
    MQTTSingleton.getClient()
      .subscribeOnce("prop3/puzzleComplete")
      .then((message) => {
        if (message === "completed") {
          MQTTSingleton.getClient().publish("prop4/index","started");
          res.status(200).json({ completed: true });
        } else {
          res.status(200).json({ completed: false });
        }
      });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
