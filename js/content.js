// 当前地址
const url = location.href,
  // 课程页面地址
  learningUrl = '//learning.uestcedu.com/',
  // 选择器
  selector = {
    // 主页面容器
    wMain: 'iframe[name="w_main"]'
    // 左侧树容器
    , wCode: 'frame[name="w_code"]'
    // 课程内容容器
    , wLmsContent: 'frame[name="w_lms_content"]'
    // 课程内容播放器容器
    , wSco: 'iframe[name="w_sco"]'

    // 当前选中节点
    , selectedNode: 'a[href="#TNA"][style*="darkblue"]'
    // 已完成节点
    , completedIcon: 'span[id$="_icon2"][class="scorm completed"]'
    // 完成中节点
    , incompletedIcon: 'span[id$="_icon1"][class="scorm incomplete"]'
    // 未完成节点
    , uncompletedIcon: 'span[id$="_icon1"][class="scorm notattempt"]'
    // 节点文字
    , node: 'a[href="#TNA"]'

    // 章节
    , chapter: '.chapter'
  };

console.log(url);

$(() => {
  if (url.indexOf(learningUrl)) {
    // 多个 iframe
    // 左侧树容器检查节点树状态
    if ($('#tdPlayerControl').length) {
      let milliseconds = 0;

      setInterval(() => {
        // 课程树容器
        const $doc = $(document);
        // 当前选中的课程节点
        const currentNode = $doc.find(selector.selectedNode);
        if (currentNode.length) {
          // 当前节点是否已完成
          if (currentNode.siblings(selector.completedIcon).length) {
            // 下一个完成中节点
            const incompletedIcon = $doc.find(selector.incompletedIcon)[0];
            // 下一个未完成节点
            const uncompletedIcon = $doc.find(selector.uncompletedIcon)[0];
            // 获取下一个节点
            let nextNode;
            if ($(incompletedIcon).length) {
              nextNode = $(incompletedIcon).siblings(selector.node);
            } else {
              nextNode = $(uncompletedIcon).siblings(selector.node);
            }
            // 点击节点
            $('head', $doc).append(`<script>${nextNode.attr('onclick')}</script>`);

            milliseconds = 0;
          }
        }
      }, 10000);
    }

    // 右侧播放器容器章节点击
    if ($(selector.chapter).length) {
      let subLength = 2;
      // 点击小节
      const subs = $(selector.chapter).find('span');
      while (subLength !== subs.length + 1) {
        if (subs.length > 1) {
          subs[subLength - 1].click();
          subLength++;
        }
      }
    }
  }
});
