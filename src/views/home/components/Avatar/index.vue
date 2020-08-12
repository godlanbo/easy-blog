<template>
  <div class="avatar-detail-container">
    <div class="avatar-detail-wrapper">
      <a href="#" class="avatar-detail-img">
        <img src="/image/avatar.jpeg" />
      </a>
      <div class="avatar-detail-text">
        <div class="title">Andrew Neil</div>
        <div class="place">Surlhet, Nepal</div>
      </div>
    </div>
    <div class="avatar-detail-content">
      <p>
        User Interface Designer and
        <br />fromt-and developer
      </p>
    </div>
    <div class="avatar-icons">
      <li>
        <a href="https://github.com/godlanbo" target="_blank">
          <i class="icon-github icon" aria-hidden="true"></i>
        </a>
      </li>
      <li>
        <a href="https://crazyforcode.org" target="_blank">
          <i class="icon-cfc icon" aria-hidden="true"></i>
        </a>
      </li>
    </div>
  </div>
</template>
<script>
export default {}
</script>
<style lang="scss" scoped>
@import '@/assets/style/globalScript';
.avatar-detail-container {
  height: 250px;
  width: 250px;
  overflow: hidden;
  text-align: center;
  margin: 0 auto;
  border-radius: 50%;
  transition: all 0.3s ease-in-out;
  background: linear-gradient(to right, #30849a, #031013);
  box-sizing: border-box;
  &:hover {
    height: 470px;
    width: 350px;
    border-radius: 5px;
    .avatar-icons li {
      opacity: 1;
      margin-left: 0px;
    }
  }
  .avatar-detail-wrapper {
    .avatar-detail-img {
      img {
        position: relative;
        z-index: 20;
        border-radius: 50%;
        display: block;
        height: 200px;
        width: 200px;
        margin: 20px auto;
        border: 5px solid #fff;
        object-fit: cover;
      }
    }
    .avatar-detail-text {
      color: #fff;
      .title {
        font-size: 30px;
        font-weight: 500;
        padding: 10px;
        line-height: 25px;
      }
      .place {
        font-size: 17px;
        margin: 10px 0;
      }
    }
  }
  .avatar-detail-content {
    color: #fff;
    font-size: 17px;
    margin-top: 10px;
    padding: 1px 20px 10px 20px;
  }
  .avatar-icons {
    position: relative;
    margin-top: -340px;
    list-style: none;
    margin-left: 10px;
    li {
      height: 40px;
      width: 40px;
      margin: 5px 0;
      opacity: 0;
      margin-left: -100px;
      transition: all 0.3s ease;
      &:nth-child(2) {
        transition-delay: 0.1s;
      }
      a {
        text-decoration: unset;
        height: 100%;
        width: 100%;
        background: #fff;
        display: block;
        line-height: 40px;
        border-radius: 50%;
        color: #031013;
        transition: all 0.3s ease;
        @include center;
        .icon {
          font-size: 25px;
        }
        &:hover {
          transform: scale(0.9);
        }
      }
    }
  }
}
</style>