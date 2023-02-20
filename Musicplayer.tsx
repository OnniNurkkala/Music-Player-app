import React, {useState, useEffect} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import Slider from '@react-native-community/slider';

import songs from './assets/Data';

import TrackPlayer, {
  State,
  usePlaybackState,
  useProgress,
} from 'react-native-track-player';

const SetupPlayer = async () => {
  await TrackPlayer.setupPlayer();
  await TrackPlayer.add(songs);
};

const togglePlayback = async playbackState => {
  const currentTrack = await TrackPlayer.getCurrentTrack();

  if (currentTrack != null) {
    if (playbackState == State.Playing) {
      await TrackPlayer.pause();
    } else {
      await TrackPlayer.play();
    }
  }
};

export default function Musicplayer() {
  const playbackState = usePlaybackState();
  const progress = useProgress();

  const [index, setindex] = useState(0);

  useEffect(() => {
    SetupPlayer();
    return () => TrackPlayer.destroy();
  }, []);

  const indexadd = () => {
    if (index < 3) {
      TrackPlayer.skipToNext();
      var newindex = index + 1;
      setindex(newindex);
    } else {
      TrackPlayer.skip(0);
      newindex = 0;
      setindex(newindex);
    }
  };

  const indexreduce = () => {
    if (index > 0) {
      TrackPlayer.skipToPrevious();
      var newindex = index - 1;
      setindex(newindex);
    } else {
      TrackPlayer.skip(3);
      var newindex2 = 3;
      setindex(newindex2);
    }
  };

  return (
    <View style={styles.mainContainer}>

      <View style={styles.container}>
        <View>
          <Image source={songs[index].image} style={styles.mainpicture} />
        </View>

        <View>
          <Text style={styles.songname}>{songs[index].title}</Text>
          <Text style={styles.artistname}>{songs[index].artist}</Text>
        </View>

        <Slider
          style={styles.slider}
          value={progress.position}
          minimumValue={0}
          maximumValue={progress.duration}
          thumbTintColor="#000000"
          minimumTrackTintColor="#000000"
          maximumTrackTintColor="#19191a"
          onSlidingComplete={async value => {
            await TrackPlayer.seekTo(value);
          }}
        />
        <View style={styles.slidertextcontainer}>
          <Text style={styles.slidertext}>
            {' '}
            {new Date(progress.position * 1000)
              .toLocaleTimeString()
              .substring(3, 7)}{' '}
          </Text>
          <Text style={styles.slidertext}>
            {' '}
            {new Date(progress.duration * 1000)
              .toLocaleTimeString()
              .substring(3, 7)}{' '}
          </Text>
        </View>

        <View style={styles.playbackbuttons}>
          <TouchableOpacity onPress={() => indexreduce()}>
            <Icon name="play-skip-back-sharp" size={35} color="#000000" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => togglePlayback(playbackState)}>
            <Icon
              name={
                playbackState == State.Playing ? 'pause-sharp' : 'play-sharp'
              }
              size={35}
              color="#000000"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => indexadd()}>
            <Icon name="play-skip-forward-sharp" size={35} color="#000000" />
          </TouchableOpacity>
        </View>
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  playbackbuttons: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '65%',
  },
  mainpicture: {
    marginTop: 60,
    width: 300,
    height: 300,
    justifyContent: 'center',
    alignContent: 'center',
  },
  slider: {
    width: 300,
    height: 50,
    marginTop: 10,
    backgroundColor: '#13213',
  },
  slidertextcontainer: {
    width: 270,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  slidertext: {},
  songname: {
    marginTop: 30,
    fontSize: 25,
    color: '#000',
    textAlign: 'center',
  },
  artistname: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 10,
  },
});
