<script>
export default {
  name: "AdminPage",
}
</script>

<template>
  <div class="main limited-width">
    <div class="title-container">
      <h1>Equestrian Club</h1>
      <p>Since 2004</p>
    </div>
    <div class="centered-container">
      <div class="left-container">
        <img src="/assets/background/aboutpage1.jpg" alt="about-paga-image-1" draggable="false">
        <p>Horses are kept in accordance with the strict measures of the zoological hygiene.
          Spacious loose boxes with sawdust are equipped with feeding troughs and water troughs. Feeding’s ration is
          picked up for each animal. Experienced professional picks up the feeding’s ration and it is strict controlled.
          Animals are fed 4 times per day with extra forages. Looseboxes cleaning are fulfilled daily. In our club it is
          organized round-the-clock groom’s duty and also we have the system of video observations. Veterinary
          examinations are hold regularly; horses get all vaccinations and dehelmithization in time. Besides training
          fields we have covered casks, automatic walking exerciser and a lot of spacious paddocks for young and sport
          horses.</p>
        <p>Equestrian "Sparta" deals with a serious breeding work. Nowadays we have livestock of
          dams of the European breeds and licensed stallions are used. It is absolutely unique for Moldova. Now we have
          excellent colts of the Dutch Warmblood (KWPN), Oldenburg and Latvian Warmblood breeds.</p>
      </div>
      <div class="right-container">
        <p>Equestrian club "Sparta" is the first Moldavian private riding club of European rang.
          It was founded in 2004 and for our days it is the biggest club in our country. Equestrian "Sparta" is situated
          in 15 minutes by car or public transport from Chisinau in the picturesque vicinity of village Budesti. The clubs
          location gives the possibility to break away from life’s hustle and bustle and to plunge in the horse’s magic
          world. You can drive up in our club at any time which is convenient for yourselves. Children can easily combine
          studies and training sessions.</p>
        <p>At the club's territory are situated 3 big stables for 70 horses. The stables are
          bright, warm and they are equipped with systems of heating and ventilation. There are comfortable men and women
          cloak-rooms, toilets and shower-rooms. Also we have a rest-room, in which person can have a rest with the cup of
          tea or coffee after the riding. Excellent training fields with special soil covering and winter riding hall
          allows to keep trainings all the year round.</p>
        <img src="/assets/background/aboutpage2.jpg" alt="about-paga-image-2" draggable="false">

      </div>
    </div>
  </div>
</template>
  
<style lang="scss" scoped>

@media (max-width: 1125px) {
  .centered-container {
    gap: 3rem !important;
    padding: 0rem !important;
  }

  .left-container,
  .right-container {
    margin: 0 !important;
  }

  img {
    max-width: 100% !important;
    height: auto !important;
  }
}

@media (max-width: 640px) {
  .centered-container {
    display: flex !important;
    flex-direction: column-reverse !important;
  }

  .title-container h1 {
    font-size: 1.7rem !important;
  }
}

.main {
  min-height: 95vh;
}
.title-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  h1 {
    margin-top: 5rem;
    margin-bottom: -1rem;
    color: #1D252C;
    height: 4rem;
    font-size: 2.5rem;
    font-style: normal;
    font-weight: 250;
    pointer-events: none;
    user-select: none;
    cursor: none;
  }

  p {
    color: #1D252C;
    font-size: 1.2rem;
    font-weight: 400;
    margin-bottom: 3rem;
    pointer-events: none;
    user-select: none;
    cursor: none;
  }
}

.centered-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5rem;
  justify-content: center;
  margin-bottom: 3rem;

  p:first-letter {
    padding-left: 1rem;
  }
  p {
    text-align: justify;
    text-justify: inter-word;
  }
}

.left-container {
  margin-left: 10rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    margin-bottom: 1rem;
    border-radius: 15px;
    height: 700px;
    width: 500px;
    user-select: none;
    pointer-events: none;
  }
}

.right-container {
  margin-right: 10rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    margin-top: 1rem;
    border-radius: 15px;
    height: 700px;
    width: 500px;
    user-select: none;
    pointer-events: none;
  }
}
</style>