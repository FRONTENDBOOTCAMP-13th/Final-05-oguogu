'use client';

import { useState, useRef } from 'react';
import { Play, Github } from 'lucide-react';

interface Farmer {
  name: string;
  role: string;
  github: string;
  message: string;
  avatar: string;
  fullReview: string;
}

interface Preview {
  title: string;
  description: string;
  videoUrl: string;
  thumbnail: string;
  color: string;
}

// 비디오 미리보기 섹션 컴포넌트
export function VideoPreviewSection({ previews }: { previews: Preview[] }) {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [activeTitle, setActiveTitle] = useState<string>('');
  const videoRef = useRef<HTMLDivElement>(null);

  const handleVideoPreview = (videoUrl: string, title: string) => {
    if (activeVideo === videoUrl) {
      setActiveVideo(null);
      setActiveTitle('');
    } else {
      setActiveVideo(videoUrl);
      setActiveTitle(title);

      // 영상 영역으로 스크롤 (약간의 지연을 두어 DOM 업데이트 후 실행)
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            inline: 'nearest',
          });
        }
      }, 100);
    }
  };

  return (
    <>
      {/* 활성화된 비디오 영역 (상단에 표시) */}
      {activeVideo && (
        <div ref={videoRef} className="mb-12 bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{activeTitle}</h3>
            <p className="text-gray-600">현재 재생 중인 가이드 영상</p>
          </div>
          <div className="max-w-6xl mx-auto">
            <div className="relative bg-black rounded-lg overflow-hidden shadow-2xl">
              <video
                src={activeVideo}
                controls
                autoPlay
                muted
                preload="metadata"
                className="w-full aspect-video"
                onError={e => {
                  console.error('Video loading error:', e);
                }}
              >
                <source src={activeVideo} type="video/mp4" />
                브라우저가 비디오를 지원하지 않습니다.
              </video>

              {/* 비디오 로딩 실패 시 대체 콘텐츠 */}
              <div className="absolute inset-0 bg-gradient-to-br from-oguogu-main-light to-oguogu-white rounded-lg p-8 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity pointer-events-none">
                <div className="text-center">
                  <div className="text-4xl mb-2">🎬</div>
                  <p className="text-sm text-gray-600">비디오 파일: {activeVideo}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 미리보기 카드들 */}
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {previews.map((preview, index) => (
          <div
            key={index}
            className="bg-white p-8 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300 hover:border-oguogu-main"
          >
            <div className="text-center">
              <div className="text-6xl mb-6">{preview.thumbnail}</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{preview.title}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">{preview.description}</p>
              <button
                onClick={() => handleVideoPreview(preview.videoUrl, preview.title)}
                className={`inline-flex items-center gap-3 px-8 py-3 rounded-lg transition-all duration-300 font-medium ${
                  activeVideo === preview.videoUrl
                    ? 'bg-oguogu-main-dark text-white shadow-lg'
                    : 'bg-oguogu-main text-white hover:bg-oguogu-main-dark hover:shadow-lg'
                }`}
              >
                <Play className="w-5 h-5" />
                <span>{activeVideo === preview.videoUrl ? '그만보기' : '미리보기'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

// 개발팀 소개 섹션 컴포넌트
export function DeveloperTeamSection({ farmers }: { farmers: Farmer[] }) {
  const [expandedFarmer, setExpandedFarmer] = useState<number | null>(null);

  const toggleFarmerExpansion = (index: number) => {
    setExpandedFarmer(expandedFarmer === index ? null : index);
  };

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {farmers.map((farmer, index) => (
        <div key={index} className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="text-center">
            <div className="text-4xl mb-3">{farmer.avatar}</div>
            <h3 className="text-lg font-bold text-gray-900">{farmer.name}</h3>
            <p className="text-oguogu-main text-sm mb-3">{farmer.role}</p>
            <p className="text-gray-600 text-sm mb-4 italic">{farmer.message}</p>

            <div className="space-y-2">
              <a
                href={farmer.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gray-900 text-white px-3 py-2 rounded text-sm hover:bg-gray-800 transition-colors"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
              <button
                onClick={() => toggleFarmerExpansion(index)}
                className="block w-full bg-oguogu-main text-white px-3 py-2 rounded text-sm hover:bg-oguogu-main-dark transition-colors"
              >
                {expandedFarmer === index ? '접기' : '자세히 보기'}
              </button>
            </div>
          </div>

          {/* 확장된 내용 */}
          {expandedFarmer === index && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-700 leading-relaxed">{farmer.fullReview}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
