import { getVideoContainSize, getVideoCoverSize, getVideoVisibleSquare } from './size';

describe('src/helpers/size.js', () => {
  describe('getVideoContainSize', () => {
    it('NO params', () => {
      const output = { width: 0, height: 0 };
      expect(getVideoContainSize()).toEqual(output);
    });
    describe('ZERO', () => {
      it('container height', () => {
        const input = {
          containerWidth: 100,
          containerHeight: 0,
          videoWidth: 640,
          videoHeight: 480,
        };
        const output = { width: 0, height: 0 };
        expect(getVideoContainSize(input)).toEqual(output);
      });
      it('container width', () => {
        const input = {
          containerWidth: 0,
          containerHeight: 100,
          videoWidth: 640,
          videoHeight: 480,
        };
        const output = { width: 0, height: 0 };
        expect(getVideoContainSize(input)).toEqual(output);
      });
      it('container height & width', () => {
        const input = {
          containerWidth: 0,
          containerHeight: 0,
          videoWidth: 640,
          videoHeight: 480,
        };
        const output = { width: 0, height: 0 };
        expect(getVideoContainSize(input)).toEqual(output);
      });
      it('video height', () => {
        const input = {
          containerWidth: 640,
          containerHeight: 480,
          videoWidth: 640,
          videoHeight: 0,
        };
        const output = { width: 0, height: 0 };
        expect(getVideoContainSize(input)).toEqual(output);
      });
      it('video width', () => {
        const input = {
          containerWidth: 640,
          containerHeight: 480,
          videoWidth: 0,
          videoHeight: 480,
        };
        const output = { width: 0, height: 0 };
        expect(getVideoContainSize(input)).toEqual(output);
      });
      it('video height & width', () => {
        const input = {
          containerWidth: 640,
          containerHeight: 480,
          videoWidth: 0,
          videoHeight: 0,
        };
        const output = { width: 0, height: 0 };
        expect(getVideoContainSize(input)).toEqual(output);
      });
    });
    describe('VIDEO aspect ratio < CONTAINER aspect ratio', () => {
      it('video width < container width', () => {
        const input = {
          containerWidth: 200,
          containerHeight: 100,
          videoWidth: 50,
          videoHeight: 200,
        };
        const output = { width: 25, height: 100 };
        expect(getVideoContainSize(input)).toEqual(output);
      });
      it('video width === container width', () => {
        const input = {
          containerWidth: 200,
          containerHeight: 100,
          videoWidth: 200,
          videoHeight: 200,
        };
        const output = { width: 100, height: 100 };
        expect(getVideoContainSize(input)).toEqual(output);
      });
      it('video width > container width', () => {
        const input = {
          containerWidth: 200,
          containerHeight: 100,
          videoWidth: 300,
          videoHeight: 300,
        };
        const output = { width: 100, height: 100 };
        expect(getVideoContainSize(input)).toEqual(output);
      });
    });
    describe('VIDEO aspect ratio > CONTAINER aspect ratio', () => {
      it('video height < container height', () => {
        const input = {
          containerWidth: 200,
          containerHeight: 100,
          videoWidth: 400,
          videoHeight: 50,
        };
        const output = { width: 200, height: 25 };
        expect(getVideoContainSize(input)).toEqual(output);
      });
      it('video height === container height', () => {
        const input = {
          containerWidth: 200,
          containerHeight: 100,
          videoWidth: 400,
          videoHeight: 100,
        };
        const output = { width: 200, height: 50 };
        expect(getVideoContainSize(input)).toEqual(output);
      });
      it('video height > container height', () => {
        const input = {
          containerWidth: 200,
          containerHeight: 100,
          videoWidth: 600,
          videoHeight: 210,
        };
        const output = { width: 200, height: 70 };
        expect(getVideoContainSize(input)).toEqual(output);
      });
    });
    describe('VIDEO aspect ratio === CONTAINER aspect ratio', () => {
      it('video width & height < container width & height', () => {
        const input = {
          containerWidth: 300,
          containerHeight: 200,
          videoWidth: 150,
          videoHeight: 100,
        };
        const output = { width: 300, height: 200 };
        expect(getVideoContainSize(input)).toEqual(output);
      });
      it('video width & height === container width & height', () => {
        const input = {
          containerWidth: 300,
          containerHeight: 200,
          videoWidth: 300,
          videoHeight: 200,
        };
        const output = { width: 300, height: 200 };
        expect(getVideoContainSize(input)).toEqual(output);
      });
      it('video width & height > container width & height', () => {
        const input = {
          containerWidth: 300,
          containerHeight: 200,
          videoWidth: 600,
          videoHeight: 400,
        };
        const output = { width: 300, height: 200 };
        expect(getVideoContainSize(input)).toEqual(output);
      });
    });
  });
  describe('getVideoCoverSize', () => {
    it('NO params', () => {
      const output = { width: 0, height: 0 };
      expect(getVideoCoverSize()).toEqual(output);
    });
    describe('ZERO', () => {
      it('container height', () => {
        const input = {
          containerWidth: 100,
          containerHeight: 0,
          videoWidth: 640,
          videoHeight: 480,
        };
        const output = { width: 0, height: 0 };
        expect(getVideoCoverSize(input)).toEqual(output);
      });
      it('container width', () => {
        const input = {
          containerWidth: 0,
          containerHeight: 100,
          videoWidth: 640,
          videoHeight: 480,
        };
        const output = { width: 0, height: 0 };
        expect(getVideoCoverSize(input)).toEqual(output);
      });
      it('container height & width', () => {
        const input = {
          containerWidth: 0,
          containerHeight: 0,
          videoWidth: 640,
          videoHeight: 480,
        };
        const output = { width: 0, height: 0 };
        expect(getVideoCoverSize(input)).toEqual(output);
      });
      it('video height', () => {
        const input = {
          containerWidth: 640,
          containerHeight: 480,
          videoWidth: 640,
          videoHeight: 0,
        };
        const output = { width: 0, height: 0 };
        expect(getVideoCoverSize(input)).toEqual(output);
      });
      it('video width', () => {
        const input = {
          containerWidth: 640,
          containerHeight: 480,
          videoWidth: 0,
          videoHeight: 480,
        };
        const output = { width: 0, height: 0 };
        expect(getVideoCoverSize(input)).toEqual(output);
      });
      it('video height & width', () => {
        const input = {
          containerWidth: 640,
          containerHeight: 480,
          videoWidth: 0,
          videoHeight: 0,
        };
        const output = { width: 0, height: 0 };
        expect(getVideoCoverSize(input)).toEqual(output);
      });
    });
    describe('VIDEO aspect ratio < CONTAINER aspect ratio', () => {
      it('video width < container width', () => {
        const input = {
          containerWidth: 200,
          containerHeight: 100,
          videoWidth: 100,
          videoHeight: 100,
        };
        const output = { width: 200, height: 200 };
        expect(getVideoCoverSize(input)).toEqual(output);
      });
      it('video width === container width', () => {
        const input = {
          containerWidth: 200,
          containerHeight: 100,
          videoWidth: 200,
          videoHeight: 200,
        };
        const output = { width: 200, height: 200 };
        expect(getVideoCoverSize(input)).toEqual(output);
      });
      it('video width > container width', () => {
        const input = {
          containerWidth: 200,
          containerHeight: 100,
          videoWidth: 300,
          videoHeight: 300,
        };
        const output = { width: 200, height: 200 };
        expect(getVideoCoverSize(input)).toEqual(output);
      });
    });
    describe('VIDEO aspect ratio > CONTAINER aspect ratio', () => {
      it('video height < container height', () => {
        const input = {
          containerWidth: 300,
          containerHeight: 200,
          videoWidth: 300,
          videoHeight: 100,
        };
        const output = { width: 600, height: 200 };
        expect(getVideoCoverSize(input)).toEqual(output);
      });
      it('video height === container height', () => {
        const input = {
          containerWidth: 300,
          containerHeight: 200,
          videoWidth: 600,
          videoHeight: 200,
        };
        const output = { width: 600, height: 200 };
        expect(getVideoCoverSize(input)).toEqual(output);
      });
      it('video height > container height', () => {
        const input = {
          containerWidth: 300,
          containerHeight: 200,
          videoWidth: 900,
          videoHeight: 300,
        };
        const output = { width: 600, height: 200 };
        expect(getVideoCoverSize(input)).toEqual(output);
      });
    });
    describe('VIDEO aspect ratio === CONTAINER aspect ratio', () => {
      it('video width & height < container width & height', () => {
        const input = {
          containerWidth: 300,
          containerHeight: 200,
          videoWidth: 150,
          videoHeight: 100,
        };
        const output = { width: 300, height: 200 };
        expect(getVideoCoverSize(input)).toEqual(output);
      });
      it('video width & height === container width & height', () => {
        const input = {
          containerWidth: 300,
          containerHeight: 200,
          videoWidth: 300,
          videoHeight: 200,
        };
        const output = { width: 300, height: 200 };
        expect(getVideoCoverSize(input)).toEqual(output);
      });
      it('video width & height > container width & height', () => {
        const input = {
          containerWidth: 300,
          containerHeight: 200,
          videoWidth: 600,
          videoHeight: 400,
        };
        const output = { width: 300, height: 200 };
        expect(getVideoCoverSize(input)).toEqual(output);
      });
    });
  });
  describe('getVideoVisibleSquare', () => {
    const createVideo = (w, h) => ({
      offsetWidth: w,
      offsetHeight: h,
      videoWidth: w,
      videoHeight: h,
    });
    const createContainer = (w, h) => ({
      offsetWidth: w,
      offsetHeight: h,
    });
    describe('video.offsetWidth === container.offsetWidth', () => {
      it('video.offsetHeight < container.offsetHeight', () => {
        const video = createVideo(1280, 720);
        const container = createContainer(1280, 800);
        const output = {
          sx: 0, sy: 0, sWidth: 1280, sHeight: 720,
        };
        expect(getVideoVisibleSquare(video, container)).toEqual(output);
      });
      it('video.offsetHeight > container.offsetHeight', () => {
        const video = createVideo(1280, 800);
        const container = createContainer(1280, 720);
        const output = {
          sx: 0, sy: 40, sWidth: 1280, sHeight: 720,
        };
        expect(getVideoVisibleSquare(video, container)).toEqual(output);
      });
    });
    describe('video.offsetHeight === container.offsetHeight', () => {
      it('video.offsetWidth < container.offsetWidth', () => {
        const video = createVideo(1280, 720);
        const container = createContainer(1440, 720);
        const output = {
          sx: 0, sy: 0, sWidth: 1280, sHeight: 720,
        };
        expect(getVideoVisibleSquare(video, container)).toEqual(output);
      });
      it('video.offsetWidth > container.offsetWidth', () => {
        const video = createVideo(1440, 720);
        const container = createContainer(1280, 720);
        const output = {
          sx: 80, sy: 0, sWidth: 1280, sHeight: 720,
        };
        expect(getVideoVisibleSquare(video, container)).toEqual(output);
      });
    });
    it('video.offsetWidth === container.offsetWidth && video.offsetHeight === container.offsetHeight', () => {
      const video = createVideo(1280, 720);
      const container = createContainer(1280, 720);
      const output = {
        sx: 0, sy: 0, sWidth: 1280, sHeight: 720,
      };
      expect(getVideoVisibleSquare(video, container)).toEqual(output);
    });
  });
});
